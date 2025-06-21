import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

app.listen(3000, () => {
  console.log(`🚀 Server started at: http://localhost:3000/`);
});
