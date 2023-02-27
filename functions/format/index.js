/**
 * Format Date object to Brazil format
 * @param {Date} date
 * @returns {string} date as DD/MM/YYYY
 */
function formatDateBR(date) {
  if (!date) throw new Error('Date is null or undefined');
  let [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
  const padStart = val => val.toString().padStart(2, '0');
  return `${padStart(day)}/${padStart(month)}/${year}`;
}

/**
 * Format number as: 100000.00 to 100.000,00
 * @param {number} value
 * @returns {string}
 */
function formatMoneyBR(value) {
  if (typeof value !== 'string') throw new Error('Param is not a string');
  return value
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

/**
 * Format Placa automotiva
 * @param {string} value
 * @returns {string}
 */
function formatPlacaOld(value) {
  if (typeof value !== 'string') throw new Error('Param is not a string');
  return value.toUpperCase().replace(/([A-Z]{3})([0-9]{4})/, '$1-$2');
}

module.exports = {
  formatDateBR,
  formatMoneyBR,
  formatPlacaOld,
};
