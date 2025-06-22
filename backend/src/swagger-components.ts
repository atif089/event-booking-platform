/**
 * @openapi
 * components:
 *   schemas:
 *     Event: 
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the event
 *         title:
 *           type: string
 *           description: The title of the event
 *         description:
 *           type: string
 *           description: The description of the event
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the event
 *         location:
 *           type: string
 *           description: The location of the event
 *         capacity:
 *           type: integer
 *           description: The capacity of the event
 *         pricePerPerson:
 *            type: number
 *            format: float
 *            description: The price per person for the event
 *         latitude:
 *            type: number
 *            format: float
 *            description: The latitude of the event location
 *         longitude:
 *            type: number
 *            format: float
 *            description: The longitude of the event location
 *         active:
 *            type: boolean
 *            description: Whether the event is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the event was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the event was last updated
 *     CreateEventData:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the event
 *         description:
 *           type: string
 *           description: The description of the event
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the event
 *         location:
 *           type: string
 *           description: The location of the event
 *         capacity:
 *           type: integer
 *           description: The capacity of the event
 *         pricePerPerson:
 *            type: number
 *            format: float
 *            description: The price per person for the event
 *         latitude:
 *            type: number
 *            format: float
 *            description: The latitude of the event location
 *         longitude:
 *            type: number
 *            format: float
 *            description: The longitude of the event location
 *         active:
 *            type: boolean
 *            description: Whether the event is active
 */
