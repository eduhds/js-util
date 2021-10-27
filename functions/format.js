/**
 * Return text with first letter to uppercase
 * @param {string} text
 * @returns {string}
 */
function capitalize(text = "") {
  if (typeof text !== "string") throw new Error("Param is not a string");
  return text.replace(/^\w/, (c) => c.toUpperCase());
}

module.exports = {
  capitalize,
};
