import { EventBookingRepository } from "../repository/eventBooking";

export const createEventBookingService = (eventBookingRepository: EventBookingRepository) => ({
  async createEventBooking(event_id: string, customer_email: string, num_attendees: number, booking_date: Date) {
    return eventBookingRepository.createEventBooking(event_id, customer_email, num_attendees, booking_date);
  },
});
