import { Router, Request, Response } from "express";
import { Pool } from "pg";
import { PgEventRepository } from "../repository/pg-event-repository";
import { createEventService } from "../service/event.service";

const router: Router = Router();

// Create a single pool for the application
const pool = new Pool({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
});

// Instantiate the repository and service with their dependencies
const eventRepository = new PgEventRepository(pool);
const eventService = createEventService(eventRepository);

/**
 * @openapi
 * /events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Fetch all events
 *     responses:
 *       200:
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get("/events", async (req: Request, res: Response) => {
  const events = await eventService.getAll();
  res.status(200).json(events);
});

export default router;
