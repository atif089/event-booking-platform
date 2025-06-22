import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import healthRouter from "./api/health";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());

// Routes
app.use("/", healthRouter); // /health route

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (!process.env.VITEST) {
  app.listen(SERVER_PORT, () => {
    console.log(`🚀 Server started.
Health check at: http://localhost:${SERVER_PORT}/health
API docs at: http://localhost:${SERVER_PORT}/api-docs`);
  });
}

export default app;
