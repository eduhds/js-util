/**
 * Timestamp em UNIX Epoch
 */
export function getUnixEpochTimestamp() {
  return Math.floor(Date.now() / 1000);
}

/**
 * Conversão de UNIX Epoch
 */
export function convertTimestampFromUnixEpoch(unixEpochTimestamp: number) {
  return Math.floor(unixEpochTimestamp * 1000);
}

/**
 * Format Date object to Brazil format DD/MM/YYYY
 */
export function formatDateBR(date: Date) {
  if (!date) throw new Error('Date is null or undefined');
  let [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
  const padStart = (val: number) => val.toString().padStart(2, '0');
  return `${padStart(day)}/${padStart(month)}/${year}`;
}
