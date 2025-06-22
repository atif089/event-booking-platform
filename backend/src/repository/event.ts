import { Event } from "../entities/event";

/**
 * EventRepository interface for event-specific operations.
 */
export interface EventRepository {
  getAll(): Promise<Event[]>;
  getById(id: string): Promise<Event | null>;
}
