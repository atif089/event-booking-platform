import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { Pool } from "pg";

dotenv.config();

const ROWS_TO_SEED = Number(process.argv[2]) || 10;

if (!process.env.DATABASE_CONNECTION_STRING) {
  console.error("Error: DATABASE_CONNECTION_STRING is not defined. Please check your .env file.");
  process.exit(1);
}

// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: `postgresql://ebp2025:ebp2025@db:5432/ebp2025`,
});

async function generateEventsData(): Promise<any[]> {
  const eventsData: any[] = [];
  const eventTypes = ["Yoga Lessons", "Workshop", "Culinary Class", "Tennis Lessons", "Fitness Class"];

  console.log(`Generating ${ROWS_TO_SEED} mock event data...`);

  for (let i = 0; i < ROWS_TO_SEED; i++) {
    const [latitude, longitude] = faker.location.nearbyGPSCoordinate({
      origin: [30.2672, -97.7431], // Austin, TX
      radius: 50, // in kilometers
      isMetric: true,
    });

    eventsData.push({
      id: faker.string.ulid(),
      title: `${faker.person.firstName()}'s ${faker.helpers.arrayElement(eventTypes)}`,
      description: `<p>${faker.lorem.paragraphs(2, "<p></p>\n")}</p>`,
      date: faker.date.soon({ days: Math.random() * 90 }),
      location: `${faker.location.streetAddress()}, Austin, TX`,
      capacity: faker.number.int({ min: 5, max: 50 }),
      pricePerPerson: parseFloat(faker.commerce.price({ min: 0, max: 600 })),
      latitude,
      longitude,
      active: Math.random() > 0.5,
    });
  }

  return eventsData;
}

async function seedEvents() {
  try {
    const client = await pool.connect();
    const eventsData = await generateEventsData();

    const insertEventQuery = `INSERT INTO "events" ("id", "title", "description", "date", "location", "capacity", "price_per_person", "latitude", "longitude", "active") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    for (const event of eventsData) {
      await client.query({
        text: insertEventQuery,
        values: [
          event.id,
          event.title,
          event.description,
          event.date,
          event.location,
          event.capacity,
          event.pricePerPerson,
          event.latitude,
          event.longitude,
          event.active,
        ],
      });
    }
    console.log(`Successfully seeded ${eventsData.length} events.`);
  } catch (error) {
    console.error("Error seeding events:", error);
  } finally {
    await pool.end();
  }
}

seedEvents();
