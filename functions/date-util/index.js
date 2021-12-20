/**
 * Timestamp em UNIX Epoch
 * @returns number
 */
function getUnixEpochTimestamp() {
	return Math.floor(Date.now() / 1000);
}

/**
 * Conversão de UNIX Epoch
 * @param {number} unixEpochTimestamp
 * @returns number
 */
function convertTimestampFromUnixEpoch(unixEpochTimestamp) {
	return Math.floor(unixEpochTimestamp * 1000);
}

module.exports = {
	getUnixEpochTimestamp,
	convertTimestampFromUnixEpoch,
};
