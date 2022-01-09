import dotenv from "dotenv";

dotenv.config();

// Dynamic import to determine where to import data from depending on node env
const { default: userBalances } = await import(
  process.env.NODE_ENV === "test"
    ? "../../test/constants.js"
    : "../../mockUserDataStorage/index.js"
);

/**
 * Returns a user object that contains the coins they hold
 * @param {string} userId
 * @return {object} user object
 *    @property {object} [BTC] - amount of BTC held by user
 *    @property {object} [ETH] - amount of ETH held by user
 */
const getUserFromUserId = (userId) => {
  if (userBalances[userId]) {
    return userBalances[userId];
  }
  throw new Error("User ID not found");
};

export default { getUserFromUserId };
