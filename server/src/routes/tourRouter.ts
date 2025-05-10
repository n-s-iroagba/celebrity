import express, { Router } from 'express';
import { TourBookingController } from '../controllers/TourBookingController';
// Router setup
const router = Router();



// Create project (Admin or Fan)
router.post(
  '/projects',
 // ensureAuth,
  TourBookingController.createProject
);

// Fan applies
router.post(
  '/projects/:projectId/apply',
 // ensureAuth,
  //ensureRole('FAN'),
  TourBookingController.applyForTour
);

// Admin finalizes booking
router.post(
  '/bookings/:bookingId/finalize',
 // ensureAuth,
 // ensureRole('ADMIN'),
  TourBookingController.finalizeBooking
);

// Fan reschedules
router.post(
  '/bookings/:bookingId/reschedule',
 // ensureAuth,
  //ensureRole('FAN'),
  TourBookingController.rescheduleBooking
);

export default router;