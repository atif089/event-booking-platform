import { randomUUID } from "crypto";
import { Knex } from "knex";
import { Event } from "../entities/event";
import { CreateEventData, EventRepository, UpdateEventData } from "./event";

/**
 * Knex implementation of EventRepository.
 */
export class KnexEventRepository implements EventRepository {
  private readonly knex: Knex;
  private readonly tableName = "events";

  // Define columns once to avoid duplication
  private readonly columns = [
    "id",
    "title",
    "description",
    "date",
    "location",
    "capacity",
    "price_per_person as pricePerPerson",
    "latitude",
    "longitude",
    "active",
    "created_at as createdAt",
    "updated_at as updatedAt",
  ];

  constructor(knex: Knex) {
    this.knex = knex;
  }

  async getAll(): Promise<Event[]> {
    const results = await this.knex(this.tableName).select(this.columns).where({ active: true }).orderBy("date", "asc");

    return results.map(this.mapRowToEvent);
  }

  async getById(id: string): Promise<Event | null> {
    const result = await this.knex(this.tableName).select(this.columns).where({ id }).first();

    return result ? this.mapRowToEvent(result) : null;
  }

  async create(data: CreateEventData): Promise<Event> {
    const { pricePerPerson, ...rest } = data;
    const [result] = await this.knex(this.tableName)
      .insert({
        id: randomUUID(),
        ...rest,
        price_per_person: pricePerPerson,
      })
      .returning(this.columns);

    return this.mapRowToEvent(result);
  }

  async update(id: string, data: UpdateEventData): Promise<Event | null> {
    const { pricePerPerson, ...rest } = data;
    const [result] = await this.knex(this.tableName)
      .where({ id })
      .update({
        ...rest,
        price_per_person: pricePerPerson,
        updated_at: new Date(),
      })
      .returning(this.columns);

    return result ? this.mapRowToEvent(result) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.knex(this.tableName).where({ id }).del();

    return result > 0;
  }

  private mapRowToEvent = (row: any): Event => {
    // Helper function to format dates consistently
    const formatDate = (date: Date | string) => (date instanceof Date ? date.toISOString() : date);

    return {
      id: row.id,
      title: row.title,
      date: formatDate(row.date),
      location: row.location,
      description: row.description,
      capacity: row.capacity,
      pricePerPerson: row.pricePerPerson,
      latitude: row.latitude,
      longitude: row.longitude,
      active: row.active,
      createdAt: formatDate(row.createdAt),
      updatedAt: formatDate(row.updatedAt),
    };
  };
}
