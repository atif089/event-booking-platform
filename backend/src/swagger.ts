import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Booking API",
      version: "1.0.0",
      description: "API documentation for the Event Booking platform",
    },
    servers: [
      {
        url: `http://localhost:${process.env.SERVER_PORT}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/api/**/*.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
