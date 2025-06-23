import { randomUUID } from "crypto";
import { Event } from "../entities/event";

export interface EventBookingRepository {
  createEventBooking(
    event_id: string,
    customer_email: string,
    num_attendees: number,
    booking_date: Date
  ): Promise<Event>;
}

export class KnexEventBookingRepository implements EventBookingRepository {
  private readonly knex: any;
  private readonly tableName = "event_booking";

  constructor(knex: any) {
    this.knex = knex;
  }

  async createEventBooking(event_id: string, customer_email: string, num_attendees: number, booking_date: Date) {

    console.log("createEventBooking")
    console.log(event_id, customer_email, num_attendees, booking_date);

    return this.knex(this.tableName).insert({
      id: randomUUID(),
      event_id,
      customer_email,
      num_attendees,
      booking_date,
    });
  }
}
