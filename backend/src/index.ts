import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.listen(SERVER_PORT, () => {
  console.log(`🚀 Server started. Health check at: http://localhost:${SERVER_PORT}/health`);
});
