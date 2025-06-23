import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";

dotenv.config();

const app = express();

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "development") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }
  next();
};

export default corsMiddleware;
