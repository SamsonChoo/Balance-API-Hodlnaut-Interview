import logger from "../../logger/index.js";
import { getCoinPrice } from "../utils/index.js";
import { UserService } from "../services/index.js";

const getBalanceFromUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const { BTC: userBTC, ETH: userETH } =
      UserService.getUserFromUserId(userId);
    const userBalanceBTC = userBTC ? (await getCoinPrice("btc")) * userBTC : 0;
    const userBalanceETH = userETH ? (await getCoinPrice("eth")) * userETH : 0;
    const userBalanceUSD = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(userBalanceBTC + userBalanceETH);
    const userBalanceData = { Balance: userBalanceUSD };
    logger.info(
      `User ${userId} called balance API. Balance Amount: ${userBalanceUSD}`
    );
    res.status(200).send(userBalanceData);
  } catch (error) {
    const errorMsg = error.message;
    logger.error(errorMsg);
    const errorObj = { Error: errorMsg };
    let errorStatus = 500;
    if (errorMsg === "User ID not found") {
      errorStatus = 404;
    }
    res.status(errorStatus).send(errorObj);
  }
};

export default { getBalanceFromUserId };
