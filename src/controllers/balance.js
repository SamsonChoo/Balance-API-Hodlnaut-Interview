import logger from "../../logger/index.js";
import { getCoinPrice, USDNumberToString } from "../utils/index.js";
import { UserService } from "../services/index.js";

/**
 * Returns an object containing user balance in USD
 * @api {get} /balance/:userId
 * @param {object} req.params
 *    @param {string} userId
 * @return {object} res
 *    @property {object} [Balance] - balance object returned if possible
 *    @property {object} [Error] - error object returned otherwise
 */
const getBalanceFromUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const { BTC: userBTC, ETH: userETH } =
      UserService.getUserFromUserId(userId);
    const userBalanceBTC = userBTC ? (await getCoinPrice("btc")) * userBTC : 0; // defaults value to 0 if user has no BTC
    const userBalanceETH = userETH ? (await getCoinPrice("eth")) * userETH : 0; // defaults value to 0 if user has no ETH
    const userBalanceUSD = USDNumberToString(userBalanceBTC + userBalanceETH);
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
