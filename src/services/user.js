import userBalances from "../../mockUserDataStorage/index.js";

const getUserFromUserId = (userId) => {
  if (userBalances[userId]) {
    return userBalances[userId];
  }
  throw new Error("User ID not found");
};

export default { getUserFromUserId };
