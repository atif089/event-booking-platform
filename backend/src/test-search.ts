import knex from "knex";
import dotenv from "dotenv";
import { KnexEventRepository } from "./repository/knex-event-repository";
import { createEventService } from "./service/event.service";

dotenv.config();

const knexInstance = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
});

// Initialize repository and service the same way as in the API
const eventRepository = new KnexEventRepository(knexInstance);
const eventService = createEventService(eventRepository);

/**
 * Test the search functionality with raw SQL WHERE queries
 */
async function testSearch() {
  try {
    console.log("=== EVENT SEARCH TEST ===");

    // Example 1: Basic search
    console.log("\n[Test 1] Finding active events");
    const activeEvents = await eventService.search("active = true");
    console.log(`Found ${activeEvents.length} active events`);
    activeEvents.slice(0, 3).forEach((event, i) => {
      console.log(`${i + 1}. ${event.title} (${event.date}) - ${event.location}`);
    });

    // Example 2: Search with parameters
    console.log("\n[Test 2] Events with specific keyword 'Tennis' in title");
    const paramQuery = await eventService.search("title LIKE ?", ["%Tennis%"]);
    console.log(`Found ${paramQuery.length} events with 'Tennis' in the title`);
    paramQuery.slice(0, 3).forEach((event, i) => {
      console.log(`${i + 1}. ${event.title} (${event.date})`);
    });

    // Example 3: More complex query with multiple parameters
    console.log("\n[Test 3] Events after Jan 2023 with capacity >= 25");
    const complexQuery = await eventService.search("date > ? AND capacity >= ?", ["2023-01-01", 25]);
    console.log(`Found ${complexQuery.length} matching events`);
    complexQuery.slice(0, 3).forEach((event, i) => {
      console.log(`${i + 1}. ${event.title} - Capacity: ${event.capacity}, Date: ${event.date}`);
    });

    // Custom test - you can modify this for your specific test needs
    console.log("\n[Custom Test] Events with price under $100");
    const customQuery = await eventService.search("price_per_person < ?", [100]);
    console.log(`Found ${customQuery.length} events with price under $100`);
    customQuery.slice(0, 3).forEach((event, i) => {
      console.log(`${i + 1}. ${event.title} - Price: ${event.pricePerPerson}, Date: ${event.date}`);
    });

    // Women only events
    console.log("\n[Test 4] Women only events");
    const womenOnlyEvents = await eventService.search("description LIKE ?", ["%women only%"]);
    console.log(`Found ${womenOnlyEvents.length} women only events`);
    womenOnlyEvents.slice(0, 3).forEach((event, i) => {
      console.log(`${i + 1}. ${event.title} (${event.date}) - ${event.location}`);
    });

    console.log("\n=== TEST COMPLETE ===");
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    // Close the database connection
    await knexInstance.destroy();
    console.log("Database connection closed");
  }
}

// Run the test
testSearch();

// Usage:
// npx ts-node src/test-search.ts
