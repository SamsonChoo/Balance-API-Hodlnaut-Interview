import logger from "../../logger/index.js";
import { getCoinPrice } from "../utils/index.js";
import { UserService } from "../services/index.js";

const getBalanceFromUserId = async (req, res) => {
  const { userId } = req.params;
  const { BTC: userBTC, ETH: userETH } = UserService.getUserFromUserId(userId);
  const userBalanceBTC = userBTC ? (await getCoinPrice("btc")) * userBTC : 0;
  const userBalanceETH = userETH ? (await getCoinPrice("eth")) * userETH : 0;
  const userBalanceUSD = userBalanceBTC + userBalanceETH;
  const userBalanceData = { Balance: `${userBalanceUSD} USD` };
  logger.info(
    `User ${userId} called balance API. Balance Amount: ${userBalanceUSD} USD.`
  );
  res.status(200).send(userBalanceData);
};

export default { getBalanceFromUserId };
