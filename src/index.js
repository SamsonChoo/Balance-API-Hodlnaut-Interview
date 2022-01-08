import express from "express";
import dotenv from "dotenv";
import logger from "../logger/index.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/", router);

app.get("/", (_req, res) => {
  res.send(
    "Please send a GET request to /balance/:userId to retrieve your balance in USD."
  );
});

app.get("*", (_req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  logger.info(`App running on http://localhost:${port}`);
});
