import express from "express";
import axios from "axios";

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

const getBTCPrice = async () => {
  try {
    const res = await axios.get(
      "https://www.bitstamp.net/api/v2/ticker/btcusd"
    );
    const {
      data: { last: latestBTCPrice },
    } = res;
    return latestBTCPrice;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return -1;
  }
};

const getETHPrice = async () => {
  try {
    const res = await axios.get(
      "https://www.bitstamp.net/api/v2/ticker/ethusd"
    );
    const {
      data: { last: latestETHPrice },
    } = res;
    return latestETHPrice;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return -1;
  }
};

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/balance/:userId", async (req, res) => {
  const BTCPrice = await getBTCPrice();
  const ETHPrice = await getETHPrice();
  const userBTC = Number(userBalances[req.params.userId].BTC);
  const userETH = Number(userBalances[req.params.userId].ETH);
  const userBalance = userBTC * BTCPrice + userETH * ETHPrice;
  const userBalanceData = { Balance: userBalance };
  res.send(userBalanceData);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
