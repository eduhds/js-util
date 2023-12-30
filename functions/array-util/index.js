/**
 * Sort array of object by key property
 * @param {string} k
 * @deprecated
 */
function sortByKey(k) {
	return function (a, b) {
		var textA = a[k];
		var textB = b[k];
		if (typeof textA === 'string') textA = textA.toUpperCase().trim();
		if (typeof textB === 'string') textB = textB.toUpperCase().trim();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	};
}

module.exports = {
	sortByKey
};
