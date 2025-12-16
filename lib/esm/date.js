/**
 * Timestamp em UNIX Epoch
 */
export function getUnixEpochTimestamp() {
    return Math.floor(Date.now() / 1000);
}
/**
 * Conversão de UNIX Epoch
 */
export function convertTimestampFromUnixEpoch(unixEpochTimestamp) {
    return Math.floor(unixEpochTimestamp * 1000);
}
/**
 * Format Date object to Brazil date format DD/MM/YYYY
 * @example
 * // returns '12/12/2012'
 * formatDateBR(new Date(2012, 11, 12))
 */
export function formatDateBR(date) {
    if (!date)
        throw new Error('Invalid Date');
    let [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
    const padStart = (val) => val.toString().padStart(2, '0');
    return `${padStart(day)}/${padStart(month)}/${year}`;
}
/**
 * Format Date object to Brazil time format HH:MM:SS
 * @example
 * // returns '12:12'
 * formatTimeBR(new Date(2012, 11, 12, 12, 12, 12))
 * // returns '12:12:12'
 * formatTimeBR(new Date(2012, 11, 12, 12, 12, 12), true)
 */
export function formatTimeBR(date, seconds = false) {
    if (!date)
        throw new Error('Invalid Date');
    let [hour, minute, second] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    const padStart = (val) => val.toString().padStart(2, '0');
    return `${padStart(hour)}:${padStart(minute)}${seconds ? `:${padStart(second)}` : ''}`;
}
