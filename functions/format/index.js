/**
 * Format Date object to Brazil format
 * @param {Date} date
 * @returns {string} date as DD/MM/YYYY
 */
function formatDateBR(date) {
  if (!date) throw new Error("Date is null or undefined");
  let day = date.getDate();
  day = day.toString().length < 2 ? `0${day}` : day;
  let month = date.getMonth() + 1;
  month = month.toString().length < 2 ? `0${month}` : month;
  return `${day}/${month}/${date.getFullYear()}`;
}

/**
 * Format number as: 100000.00 to 100.000,00
 * @param {number} value
 * @returns {string}
 */
function formatMoneyBR(value) {
  if (typeof value !== "string") throw new Error("Param is not a string");
  return value
    .toFixed(2)
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

/**
 * Format Placa automotiva
 * @param {string} value
 * @returns {string}
 */
function formatPlacaOld(value) {
  if (typeof value !== "string") throw new Error("Param is not a string");
  return value.toUpperCase().replace(/([A-Z]{3})([0-9]{4})/, "$1-$2");
}

module.exports = {
  formatDateBR,
  formatMoneyBR,
  formatPlacaOld,
};
