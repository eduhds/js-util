/**
 * Format text to lowercase and without special characters
 * @param {string} text
 * @deprecated
 */
function normalizeLower(text) {
	if (typeof text !== 'string') throw new Error('Param is not a string');
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();
}

/**
 * Return text with first letter to uppercase
 * @param {string} text
 * @returns {string}
 * @deprecated
 */
function capitalize(text = '') {
	if (typeof text !== 'string') throw new Error('Param is not a string');
	return text.length > 1 ? text.charAt(0).toUpperCase() + text.slice(1) : text.toUpperCase();
}

/**
 * Extract number from text
 * @param {string} text
 * @returns number
 * @deprecated
 */
function numberFromText(text) {
	if (typeof text !== 'string') throw new Error('Param is not a string');
	let number = text.replace(/\D/g, '').replace(',', '.').trim();
	return Number(number);
}

/**
 * Get file name from a file system path string
 * @param {string} path
 * @returns string
 * @deprecated
 */
function fileNameFromPath(path) {
	if (typeof text !== 'string') throw new Error('Param is not a string');
	let pathReverse = path.split('').reverse();
	let fileName = pathReverse.slice(0, pathReverse.indexOf('/')).reverse().join('');
	return fileName;
}

/**
 * Get extension from file name string
 * @param {string} fileName
 * @returns string
 * @deprecated
 */
function extensionFromFileName(fileName) {
	if (typeof text !== 'string') throw new Error('Param is not a string');
	let reversed = fileName.split('').reverse();
	let extension = reversed.slice(0, reversed.indexOf('.')).reverse().join('');
	return extension;
}

module.exports = {
	normalizeLower,
	capitalize,
	numberFromText,
	fileNameFromPath,
	extensionFromFileName
};
