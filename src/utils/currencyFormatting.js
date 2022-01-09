/**
 * Converts a number into string representation of USD value
 * @param {number} amount
 * @return {string} formatted string
 */
const USDNumberToString = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",
  }).format(amount);

/**
 * Converts a USD string into numerical value
 * @param {string} string
 * @return {number} formatted number
 */
const USDStringToNumber = (string) => {
  const thousandSeparator = Intl.NumberFormat("en-IN")
    .format(11111)
    .replace(/\p{Number}/gu, "");
  const decimalSeparator = Intl.NumberFormat("en-IN")
    .format(1.1)
    .replace(/\p{Number}/gu, "");
  return parseFloat(
    string
      .replace(new RegExp(`\\${thousandSeparator}`, "g"), "")
      .replace(new RegExp(`\\${decimalSeparator}`), ".")
  );
};

export { USDNumberToString, USDStringToNumber };
