import dotenv from "dotenv";

dotenv.config();

const { default: userBalances } = await import(
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATA_PATH
    : "../../mockUserDataStorage/index.js"
);

const getUserFromUserId = (userId) => {
  if (userBalances[userId]) {
    return userBalances[userId];
  }
  throw new Error("User ID not found");
};

export default { getUserFromUserId };
