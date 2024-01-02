"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateBR = exports.convertTimestampFromUnixEpoch = exports.getUnixEpochTimestamp = void 0;
/**
 * Timestamp em UNIX Epoch
 */
function getUnixEpochTimestamp() {
    return Math.floor(Date.now() / 1000);
}
exports.getUnixEpochTimestamp = getUnixEpochTimestamp;
/**
 * Conversão de UNIX Epoch
 */
function convertTimestampFromUnixEpoch(unixEpochTimestamp) {
    return Math.floor(unixEpochTimestamp * 1000);
}
exports.convertTimestampFromUnixEpoch = convertTimestampFromUnixEpoch;
/**
 * Format Date object to Brazil format DD/MM/YYYY
 */
function formatDateBR(date) {
    if (!date)
        throw new Error('Date is null or undefined');
    let [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
    const padStart = (val) => val.toString().padStart(2, '0');
    return `${padStart(day)}/${padStart(month)}/${year}`;
}
exports.formatDateBR = formatDateBR;
