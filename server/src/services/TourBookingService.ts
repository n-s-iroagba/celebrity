import { Sequelize } from "sequelize";
import { Booking } from "../models/Booking";
import { BookingAddon } from "../models/BookingAddon";
import { User } from "../models/User";
import { FlightDetail } from "../models/FligntDetail";
import { HotelDetail } from "../models/HotelDetail";
import Invoice from "../models/Invoice";
import { Project } from "../models/Project";
import { Role } from "../enums/Role";

export interface CreateProjectDTO {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  accessLevels: Record<string, number>;
}

export interface ApplyTourDTO {
  hotel: {
    hotelType: '3_STAR' | '4_STAR' | '5_STAR' | 'BOUTIQUE';
    roomType: string;
    checkIn: Date;
    checkOut: Date;
  };
  flight: {
    flightClass: 'ECONOMY' | 'BUSINESS' | 'FIRST' | 'PRIVATE';
    departureAirport: string;
    arrivalAirport: string;
    departureDate: Date;
    arrivalDate: Date;
    airportPickup: boolean;
  };
  addons: Array<'PHOTOGRAPHY' | 'SECURITY' | 'INSURANCE' | 'SOUVENIR' | 'POST_TOUR_ACCESS'>;
  withGuest: boolean;
}

export interface FinalizeBookingDTO {
  totalPrice: number;
  invoiceType: 'Tour' | 'Booking' | 'Souvenir' | 'Ticket' | 'ClubMembership' | 'Charity'|'Reservation';
  invoiceDate: Date;
}

export interface RescheduleDTO {
  hotel: {
    hotelType: '3_STAR' | '4_STAR' | '5_STAR' | 'BOUTIQUE';
    roomType: string;
    checkIn: Date;
    checkOut: Date;
  };
  flight: {
    flightClass: 'ECONOMY' | 'BUSINESS' | 'FIRST' | 'PRIVATE';
    departureAirport: string;
    arrivalAirport: string;
    departureDate: Date;
    arrivalDate: Date;
    airportPickup: boolean;
  };
  invoiceType: 'TOUR' | 'Booking' | 'Souvenir' | 'Ticket' | 'ClubMembership' | 'Charity';
  newPrice: number;
  invoiceDate: Date;
}
export class TourBookingService {
  // Admin creates a TOUR project
  static async createTourProject(
    isAdmin:boolean = false,
    sequelize: Sequelize,
    adminId: number,
    projectData: CreateProjectDTO
  ): Promise<Project> {
    return await sequelize.transaction(async (tx) => {
      // Ensure admin exists and has role
      const admin = await User.findByPk(adminId, { transaction: tx });
      if (!admin || admin.role !== Role.ADMIN) {
        throw new Error('Only admins can create projects');
      }
      const project = await Project.create(
        {
          ...projectData,
          celebrityId: adminId,
          isActive: true,
          type: isAdmin?'Tour':'Reservation',
        },
        { transaction: tx }
      );
      return project;
    });
  }

  // User applies to tour: create Booking + details
  static async applyForTour(
    sequelize: Sequelize,
    UserId: number,
    projectId: number,
    application: ApplyTourDTO
  ): Promise<Booking> {
    return await sequelize.transaction(async (tx) => {
      // Verify User and project
      const user = await User.findByPk(UserId, { transaction: tx });
      const project = await Project.findByPk(projectId, { transaction: tx });
      if (!user || user.role !== Role.FAN) {
        throw new Error('Invalid User');
      }
      if (!project || project.type !== 'Tour') {
        throw new Error('Invalid tour project');
      }

      // Create booking
      const booking = await Booking.create(
        {
          userId: UserId,
          projectId,
          accessLevel: JSON.stringify(project.accessLevels),
          withGuest: application.withGuest,
          totalPrice: 0, // to be finalized
        },
        { transaction: tx }
      );

      // Flight details
      await FlightDetail.create(
        {
          bookingId: booking.id,
          ...application.flight,
        },
        { transaction: tx }
      );

      // Hotel details
      await HotelDetail.create(
        {
          bookingId: booking.id,
          ...application.hotel,
        },
        { transaction: tx }
      );

      // Addons
      for (const type of application.addons) {
        await BookingAddon.create(
          { bookingId: booking.id, type, price: 0, details: {} },
          { transaction: tx }
        );
      }

      return booking;
    });
  }

  // Admin finalizes booking: sets price and creates invoice
  static async finalizeBooking(
    sequelize: Sequelize,
    adminId: number,
    bookingId: number,
    finalizeData: FinalizeBookingDTO
  ): Promise<{ booking: Booking; invoice: Invoice }> {
    return await sequelize.transaction(async (tx) => {
      // Verify admin
      const admin = await User.findByPk(adminId, { transaction: tx });
      if (!admin || admin.role !== Role.ADMIN) {
        throw new Error('Only admins can finalize bookings');
      }
      const booking = await Booking.findByPk(bookingId, { transaction: tx });
      if (!booking) {
        throw new Error('Booking not found');
      }
      // Update booking
      booking.totalPrice = finalizeData.totalPrice;
      booking.status = 'CONFIRMED';
      await booking.save({ transaction: tx });

      // Create invoice
      const invoice = await Invoice.create(
        {
          invoiceType: finalizeData.invoiceType,
          price: finalizeData.totalPrice,
          paymentDate: finalizeData.invoiceDate,
         
        },
        { transaction: tx }
      );

      return { booking, invoice };
    });
  }

    static async rescheduleBooking(
    sequelize: Sequelize,
    fanId: number,
    bookingId: number,
    rescheduleData: RescheduleDTO
  ): Promise<{ booking: Booking;
    //  invoice: Invoice
     }> {
    return await sequelize.transaction(async (tx) => {
      const fan = await User.findByPk(fanId, { transaction: tx });
      const booking = await Booking.findByPk(bookingId, { include: [FlightDetail, HotelDetail], transaction: tx });
      if (!fan || fan.role !== Role.FAN || booking?.userId !== fanId) throw new Error('Unauthorized');
      if (!booking || booking.status !== 'CONFIRMED') throw new Error('Booking not eligible for reschedule');

      await FlightDetail.update(
        { ...rescheduleData.flight },
        { where: { bookingId }, transaction: tx }
      );
      await HotelDetail.update(
        { ...rescheduleData.hotel },
        { where: { bookingId }, transaction: tx }
      );

      booking.totalPrice = rescheduleData.newPrice;
      await booking.save({ transaction: tx });

      // const invoice = await Invoice.create(
      //   {
      //     invoiceType: rescheduleData.invoiceType,
      //     price: rescheduleData.newPrice,
      //     paymentDate: rescheduleData.invoiceDate,
      //     paymentId: null,
      //   },
      //   { transaction: tx }
      // );

      return { booking, 
        // invoice
       };
    });
  }
}
