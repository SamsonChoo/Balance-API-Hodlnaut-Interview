import userBalances from "../../mock/index.js";

const getUserFromUserId = (userId) => userBalances[userId];

export default { getUserFromUserId };
