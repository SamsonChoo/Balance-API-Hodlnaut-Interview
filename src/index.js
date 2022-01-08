import express from "express";
import axios from "axios";
import logger from "../logger/index.js";
import userBalances from "../mock/index.js";

const app = express();
const port = 3000;

const getCoinPrice = async (coin) => {
  if (coin.toLowerCase() === "eth" || coin.toLowerCase() === "btc") {
    try {
      const res = await axios.get(
        `https://www.bitstamp.net/api/v2/ticker/${coin}usd`
      );
      const {
        data: { last: latestBTCPrice },
      } = res;
      return Number(latestBTCPrice);
    } catch (err) {
      logger.error(err);
      return -1;
    }
  } else {
    const e = new Error("Invalid coin type");
    logger.error(e);
    throw e;
  }
};

app.get("/", (_req, res) => {
  res.send(
    "Please send a GET request to /balance/:userId to retrieve your balance in USD."
  );
});

app.get("/balance/:userId", async (req, res) => {
  const {userId} = req.params;
  const { BTC: userBTC, ETH: userETH } = userBalances[userId];
  const BTCPrice = await getCoinPrice("btc");
  const ETHPrice = await getCoinPrice("eth");
  const userBalanceUSD = userBTC * BTCPrice + userETH * ETHPrice;
  const userBalanceData = { Balance: `${userBalanceUSD} USD` };
  logger.info(
    `User ${userId} called balance API. Balance Amount: ${userBalanceUSD} USD.`
  );
  res.send(userBalanceData);
});

app.get("*", (_req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  logger.info(`Example app listening at http://localhost:${port}`);
});
