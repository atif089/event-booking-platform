import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";
import { Pool } from "pg";
import { PgEventRepository } from "../../repository/pg-event-repository";
import { EventRepository } from "../../repository/event";
import { Event } from "../../entities/event";

// Mock the Pool
const mockPool = {
  query: vi.fn(),
} as unknown as Pool;

let repo: EventRepository;

describe("PgEventRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    repo = new PgEventRepository(mockPool);
  });

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
    (mockPool.query as Mock).mockResolvedValue({ rows: mockEvents });

    const events: Event[] = await repo.getAll();

    expect(mockPool.query).toHaveBeenCalledWith(
      `SELECT id, title, description, date, location, capacity, "price_per_person" as "pricePerPerson", latitude, longitude, active, "created_at" as "createdAt", "updated_at" as "updatedAt" FROM events WHERE active = true ORDER BY date ASC`
    );
    expect(events).toEqual(mockEvents);
    expect(events.length).toBe(1);
  });
});
