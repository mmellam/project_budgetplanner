import dotenv from "dotenv";
dotenv.config();
import express from "express";

import envRouter from "./routes/envelopes";
import transfersRouter from "./routes/transfers";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/envelopes", envRouter);
app.use("/api/transfers", transfersRouter);

app.get("/", (_req, res) => {
  res.status(200).send("<h1>Welcome to Budgetplanner 2.0!<h1>");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
