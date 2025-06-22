import { Event } from "../entities/event";

/**
 * Data for creating a new event.
 */
export type CreateEventData = Omit<Event, "id" | "createdAt" | "updatedAt">;

/**
 * EventRepository interface for event-specific operations.
 */

export type UpdateEventData = Partial<Omit<CreateEventData, "id">>;

export interface EventRepository {
  getAll(): Promise<Event[]>;
  getById(id: string): Promise<Event | null>;
  create(data: CreateEventData): Promise<Event>;
  update(id: string, data: UpdateEventData): Promise<Event | null>;
  delete(id: string): Promise<boolean>;
}
