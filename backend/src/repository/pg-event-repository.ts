import { Pool } from "pg";
import { Event } from "../entities/event";
import { EventRepository } from "./event";

/**
 * PostgreSQL implementation of EventRepository.
 */
export class PgEventRepository implements EventRepository {
  private readonly pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getAll(): Promise<Event[]> {
    const result = await this.pool.query(
      `SELECT id, title, description, date, location, capacity, "price_per_person" as "pricePerPerson", latitude, longitude, active, "created_at" as "createdAt", "updated_at" as "updatedAt" FROM events WHERE active = true ORDER BY date ASC`
    );
    return result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      date: row.date instanceof Date ? row.date.toISOString() : row.date,
      location: row.location,
      description: row.description,
      capacity: row.capacity,
      pricePerPerson: row.pricePerPerson,
      latitude: row.latitude,
      longitude: row.longitude,
      active: row.active,
      createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt,
      updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : row.updatedAt,
    }));
  }
}
