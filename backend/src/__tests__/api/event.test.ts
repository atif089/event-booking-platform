import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import { Router, Request, Response, NextFunction } from "express";
import { createEventService } from "../../service/event.service";

// Create mock repository
const mockEventRepository = {
  getAll: vi.fn(),
  getById: vi.fn()
};

// Mock the event service
const eventService = createEventService(mockEventRepository);

// Create router just like in events.ts but with mock dependencies
const router = Router();

// Create endpoint handlers
router.get("/events", (req: Request, res: Response, next: NextFunction) => {
  eventService
    .getAll()
    .then((events) => res.status(200).json(events))
    .catch(next);
});

router.get("/events/:id", (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  eventService.getById(id)
    .then(event => {
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(event);
    })
    .catch(next);
});

// Create a minimal express app for testing this specific route
const app = express();
app.use(express.json());
app.use("/", router);

describe("Events API", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("GET /events", () => {
    it("should return 200 and a list of events", async () => {
      // Mock data
      const mockEvents = [
        {
          id: "1",
          title: "Test Event 1",
          date: "2025-07-01T12:00:00Z",
          location: "Test Location 1",
          active: true
        },
        {
          id: "2",
          title: "Test Event 2",
          date: "2025-07-02T12:00:00Z",
          location: "Test Location 2",
          active: true
        }
      ];
      
      // Setup mock
      mockEventRepository.getAll.mockResolvedValue(mockEvents);

      // Make request
      const response = await request(app).get("/events");
      
      // Assert response
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("title");
      expect(response.body[0]).toHaveProperty("date");
      expect(response.body[0]).toHaveProperty("location");
      
      // Assert mock was called
      expect(mockEventRepository.getAll).toHaveBeenCalled();
    });

    it("should handle errors properly", async () => {
      // Setup mock to throw error
      const errorMessage = "Database error";
      mockEventRepository.getAll.mockRejectedValue(new Error(errorMessage));
      
      // Make request
      const response = await request(app).get("/events");
      
      // Express default error handler returns 500
      expect(response.status).toBe(500);
    });
  });

  describe("GET /events/:id", () => {
    it("should return 200 and an event when event exists", async () => {
      const mockEvent = {
        id: "123",
        title: "Test Event",
        date: "2025-07-01T12:00:00Z",
        location: "Test Location",
        description: "Test Description",
        active: true
      };

      mockEventRepository.getById.mockResolvedValue(mockEvent);

      const response = await request(app).get("/events/123");
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEvent);
      expect(mockEventRepository.getById).toHaveBeenCalledWith("123");
    });

    it("should return 404 when event does not exist", async () => {
      mockEventRepository.getById.mockResolvedValue(null);

      const response = await request(app).get("/events/999");
      
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Event not found" });
      expect(mockEventRepository.getById).toHaveBeenCalledWith("999");
    });

    it("should handle errors properly", async () => {
      const errorMessage = "Database error";
      mockEventRepository.getById.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get("/events/123");
      
      // Express default error handler returns 500
      expect(response.status).toBe(500);
    });
  });
});
