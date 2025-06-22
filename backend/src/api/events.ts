import { Router, Request, Response, NextFunction } from "express";


import { KnexEventRepository } from "../repository/knex-event-repository";
import { createEventService } from "../service/event.service";
import { knexInstance } from "../drivers/db";

const router: Router = Router();

// Instantiate the repository and service with their dependencies
const eventRepository = new KnexEventRepository(knexInstance);
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
router.get("/events", (req: Request, res: Response, next: NextFunction) => {
  eventService
    .getAll()
    .then((events) => res.status(200).json(events))
    .catch(next);
});

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Fetch a single event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 */
router.get("/events/:id", (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  eventService
    .getById(id)
    .then((event) => {
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(event);
    })
    .catch(next);
});

/**
 * @openapi
 * /events:
 *   post:
 *     tags:
 *       - Events
 *     summary: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventData'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid input
 */
router.post("/events", (req: Request, res: Response, next: NextFunction) => {
  eventService
    .create(req.body)
    .then((event) => res.status(201).json(event))
    .catch(next);
});

export default router;
