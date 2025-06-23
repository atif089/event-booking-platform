import { Router, Request, Response, NextFunction } from "express";

import { KnexEventBookingRepository } from "../repository/eventBooking";
import { createEventBookingService } from "../service/eventBooking.service";
import { knexInstance } from "../drivers/db";

const router: Router = Router();

// Instantiate the repository and service with their dependencies
const eventRepository = new KnexEventBookingRepository(knexInstance);
const eventService = createEventBookingService(eventRepository);

router.post("/event-bookings", (req: Request, res: Response, next: NextFunction) => {
  const { event_id, customer_email, num_attendees, booking_date } = req.body;

  eventService
    .createEventBooking(
      event_id as string,
      customer_email as string,
      Number(num_attendees),
      new Date(booking_date as string)
    )
    .then((events) => res.status(200).json(events))
    .catch(next);
});

export default router;
