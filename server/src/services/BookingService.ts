import { Booking } from "../models/Booking";
import { Schedule } from "../models/Schedule";
import { BookingType } from "../enums/BookingType";

export class BookingService {
  // Create a new booking
  static async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    const { type, scheduleId, fanId, celebrityId } = bookingData;

    if (!type || !scheduleId || !fanId || !celebrityId) {
      throw new Error("Missing required fields for booking");
    }

    return await Booking.create({ type, scheduleId, fanId, celebrityId } as Booking);
  }

  // Retrieve a booking by ID
  static async getBookingByFanId(fanId: number): Promise<Booking | null> {
    return await Booking.findOne({
      where: {
        fanId: fanId,
      },
      include: ["fan", "celebrity", "schedule"], // Correct placement of include
    });
  }
  

  // Update booking type
  static async updateBookingType(bookingId: number, newType: BookingType): Promise<Booking> {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) throw new Error("Booking not found");

    booking.type = newType;
    return await booking.save();
  }

  // Update booking schedule
  static async updateBookingSchedule(bookingId: number, newScheduleId: number): Promise<Booking> {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) throw new Error("Booking not found");

    const scheduleExists = await Schedule.findByPk(newScheduleId);
    if (!scheduleExists) throw new Error("Schedule not found");

    booking.scheduleId = newScheduleId;
    return await booking.save();
  }
}
