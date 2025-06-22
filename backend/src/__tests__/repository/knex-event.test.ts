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
  insert: vi.fn().mockReturnThis(),
  returning: vi.fn().mockReturnThis(),
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

  describe("create", () => {
    it("should create an event and return it", async () => {
      const eventData = {
        title: "New Event",
        description: "A cool event",
        date: new Date().toISOString(),
        location: "Someplace",
        capacity: 100,
        pricePerPerson: 25,
      };
      const createdEvent = { ...eventData, id: "gen-id-123" };

      // Setup mock
      queryBuilder.returning.mockResolvedValueOnce([createdEvent]);

      const result = await repo.create(eventData);

      const { pricePerPerson, ...restOfEventData } = eventData;

      expect(mockKnex).toHaveBeenCalledWith("events");
      expect(queryBuilder.insert).toHaveBeenCalledWith(expect.objectContaining({
        id: expect.any(String),
        ...restOfEventData,
        price_per_person: pricePerPerson,
      }));
      expect(queryBuilder.returning).toHaveBeenCalled();
      expect(result).toEqual(createdEvent);
    });
  });
});
