import express from "express";

const app = express();
const port = 3000;

const userBalances = {
  "user-1": {
    BTC: "0.5",
    ETH: "2",
  },
  "user-2": {
    BTC: "0.1",
  },
  "user-3": {
    ETH: "5",
  },
};

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/balance/:userId", (req, res) => {
  res.send(userBalances[req.params.userId]);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
