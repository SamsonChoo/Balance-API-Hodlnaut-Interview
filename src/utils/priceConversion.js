import axios from "axios";
import logger from "../../logger/index.js";

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
      throw err;
    }
  } else {
    const e = new Error("Invalid coin type");
    logger.error(e);
    throw e;
  }
};

export default getCoinPrice;
