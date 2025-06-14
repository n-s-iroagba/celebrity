import { Router, Request, Response, NextFunction } from 'express';
import { Sequelize } from 'sequelize';
import { TourBookingService, CreateProjectDTO, ApplyTourDTO, FinalizeBookingDTO, RescheduleDTO } from '../services/TourBookingService';

// Assume you have a Sequelize instance exported from config
import sequelize from '../config/orm';
import { Fan } from '../models/Fan';

export class TourBookingController {
  /**
   * POST /projects
   * Admins create TOUR, Fans create RESERVATION
   */
  static async createProject(req: Request, res: Response):Promise<any> {
    try {
      const userId = req.params.id as unknown as number;
      const dto: CreateProjectDTO = req.body;
      const project = await TourBookingService.createTourProject(true, sequelize, userId, dto);
      return res.status(201).json(project);
    } catch (err) {
      console.error('error',err)
      return res.status(500).json({message:'an error occured in tour booking controller'})
    }
  }
  static async BookReservation(req: Request, res: Response):Promise<any> {
    try {
      const userId = req.params.id as unknown as number;
      const reservationCreationDto: CreateProjectDTO = req.body.reservationCreationDto;
      const project = await TourBookingService.createTourProject(false,sequelize, userId, reservationCreationDto);
       const dto: ApplyTourDTO = req.body.reservationApplicationDto;
       const fan = await Fan.findOne({where:{
        userId:userId
       }})
       if(!fan)throw new Error('fan does not exist')
      const booking = await TourBookingService.applyForTour(sequelize, fan.id, project.id, dto);
      return res.status(201).json(project);
    } catch (err) {
      console.error('error',err)
      return res.status(500).json({message:'an error occured in tour booking controller'})
    }
  }
  /**
   * POST /projects/:projectId/apply
   * Fan applies to a TOUR
   */
  static async applyForTour(req: Request, res: Response):Promise<any> {
    try {
      const fanId = req.params.id as unknown as number;
      const projectId = Number(req.params.projectId);
      const dto: ApplyTourDTO = req.body;
      const booking = await TourBookingService.applyForTour(sequelize, fanId, projectId, dto);
      return res.status(201).json(booking);
    } catch (err) {
      console.error('error',err)
      return res.status(500).json({message:'an error occured in tour booking controller'})
    }
  }

  /**
   * POST /bookings/:bookingId/finalize
   * Admin finalizes booking
   */
  static async finalizeBooking(req: Request, res: Response):Promise<any> {
    try {
      const adminId = req.params.id as unknown as number;
      const bookingId = Number(req.params.bookingId);
      const dto: FinalizeBookingDTO = req.body;
      const result = await TourBookingService.finalizeBooking(sequelize, adminId, bookingId, dto);
      return res.status(200).json(result);
    } catch (err) {
      console.error('error',err)
      return res.status(500).json({message:'an error occured in tour booking controller'})
    }
  }

  /**
   * POST /bookings/:bookingId/reschedule
   * Fan requests to reschedule
   */
  static async rescheduleBooking(req: Request, res: Response):Promise<any> {
    try {
      const fanId = req.params.id as unknown as number;
      const bookingId = Number(req.params.bookingId);
      const dto: RescheduleDTO = req.body;
      const result = await TourBookingService.rescheduleBooking(sequelize, fanId, bookingId, dto);
      return res.status(200).json(result);
    } catch (err) {
      console.error('error',err)
      return res.status(500).json({message:'an error occured in tour booking controller'})
    }
  }
}
