import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../index";

describe("GET /health", () => {
  it("should return 200 with a status of 'ok'", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
