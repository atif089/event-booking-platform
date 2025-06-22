import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../index";

// Integration test for GET /events

describe("GET /events", () => {
  it("should return 200 and a list of events", async () => {
    const response = await request(app).get("/events");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("title");
    expect(response.body[0]).toHaveProperty("date");
    expect(response.body[0]).toHaveProperty("location");
  });
});
