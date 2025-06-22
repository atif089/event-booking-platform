import { Event } from "../entities/event";

/**
 * Data for creating a new event.
 */
export type CreateEventData = Omit<Event, "id" | "createdAt" | "updatedAt">;

/**
 * EventRepository interface for event-specific operations.
 */
export interface EventRepository {
  getAll(): Promise<Event[]>;
  getById(id: string): Promise<Event | null>;
  create(data: CreateEventData): Promise<Event>;
}
