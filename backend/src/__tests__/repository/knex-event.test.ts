import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";
import { Knex } from "knex";
import { KnexEventRepository } from "../../repository/knex-event-repository";
import { EventRepository } from "../../repository/event";
import { Event } from "../../entities/event";

// Create a properly chained mock for Knex
const queryBuilder = {
  select: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  orderBy: vi.fn().mockReturnThis(),
  first: vi.fn().mockReturnThis(),
};

// Mock the knex instance that returns our query builder
const mockKnex = vi.fn(() => queryBuilder) as unknown as Knex & typeof queryBuilder;

let repo: EventRepository;

describe("KnexEventRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    repo = new KnexEventRepository(mockKnex);
  });

  describe("getAll", () => {
    it("should fetch all active events from the database", async () => {
      const mockEvents: Event[] = [
        {
          id: "1",
          title: "Test Event",
          date: new Date().toISOString(),
          location: "Test Location",
          active: true,
        },
      ];

      // Set up the mock to return the events after all the chained calls
      queryBuilder.orderBy.mockResolvedValueOnce(mockEvents);

      const events = await repo.getAll();

      expect(mockKnex).toHaveBeenCalledWith("events");
      expect(queryBuilder.select).toHaveBeenCalled();
      expect(queryBuilder.where).toHaveBeenCalledWith({ active: true });
      expect(queryBuilder.orderBy).toHaveBeenCalledWith("date", "asc");
      expect(events).toEqual(mockEvents);
      expect(events.length).toBe(1);
    });
  });

  describe("getById", () => {
    it("should fetch an event by id", async () => {
      const mockEvent: Event = {
        id: "1",
        title: "Test Event",
        date: new Date().toISOString(),
        location: "Test Location",
        active: true,
      };

      // Set up the mock to return the event after all the chained calls
      queryBuilder.first.mockResolvedValueOnce(mockEvent);

      const event = await repo.getById("1");

      expect(mockKnex).toHaveBeenCalledWith("events");
      expect(queryBuilder.select).toHaveBeenCalled();
      expect(queryBuilder.where).toHaveBeenCalledWith({ id: "1" });
      expect(queryBuilder.first).toHaveBeenCalled();
      expect(event).toEqual(mockEvent);
    });

    it("should return null when event is not found", async () => {
      // Set up the mock to return null after all the chained calls
      queryBuilder.first.mockResolvedValueOnce(null);

      const event = await repo.getById("999");

      expect(mockKnex).toHaveBeenCalledWith("events");
      expect(queryBuilder.select).toHaveBeenCalled();
      expect(queryBuilder.where).toHaveBeenCalledWith({ id: "999" });
      expect(queryBuilder.first).toHaveBeenCalled();
      expect(event).toBeNull();
    });
  });
});
