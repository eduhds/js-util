/**
 * Return as 000.000.000-00
 * @param {string} text
 * @returns string
 * @deprecated
 */
function maskCpf(text = '') {
	return text
		.replace(/\D/g, '')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})/, '$1-$2')
		.replace(/(-\d{2})\d+?$/, '$1');
}

/**
 * Return as 00.000.000/0000-00
 * @param {string} text
 * @returns string
 * @deprecated
 */
function maskCnpj(text = '') {
	return text
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1/$2')
		.replace(/(\d{4})(\d)/, '$1-$2')
		.replace(/(-\d{2})\d+?$/, '$1');
}

/**
 * Return as (00) 0000-0000 or (00) 00000-0000
 * @param {string} text
 * @returns string
 * @deprecated
 */
function maskPhone(text = '') {
	return text
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '($1) $2')
		.replace(/(\d{4})(\d)/, '$1-$2')
		.replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
		.replace(/(-\d{4})\d+?$/, '$1');
}

/**
 * Return as 00000-000
 * @param {string} text
 * @returns string
 * @deprecated
 */
function maskCep(text = '') {
	return text
		.replace(/\D/g, '')
		.replace(/(\d{5})(\d)/, '$1-$2')
		.replace(/(-\d{3})\d+?$/, '$1');
}

/**
 * Return as 00/00/0000
 * @param {string} text
 * @returns string
 * @deprecated
 */
function maskDate(text = '') {
	return text
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '$1/$2')
		.replace(/(\d{2})(\d)/, '$1/$2')
		.replace(/(\d{4})\d+?$/, '$1');
}

/**
 * Return as R$ 0,00
 * @param {string} text
 * @returns string
 * @deprecated
 */
function maskMoney(text = '') {
	return text
		.replace(/\D/g, '')
		.replace(/^(\d{1})$/g, '0,0$1')
		.replace(/^(\d{2})$/g, '0,$1')
		.replace(/^(\d{1,})(\d{2})$/g, '$1,$2')
		.replace(/^00(,\d{2})$/g, '0$1')
		.replace(/^00(\d)(,\d{2})$/g, '$1$2')
		.replace(/^0(\d)(,\d{2})$/g, '$1$2')
		.replace(/^(\d{1,})(,\d{2})$/g, 'R$ $1$2');
}

/**
 * Return numbers
 * @param {string} text
 * @returns string
 * @deprecated
 */
function maskNumber(text = '') {
	return text.replace(/\D/g, '');
}

/**
 * Mask text
 * @param {string} maskType
 * @param {Function} onChangeText
 * @returns {Function}
 * @deprecated
 */
function maskText(maskType, onChangeText) {
	return function (text) {
		switch (maskType) {
			case 'number':
				onChangeText(maskNumber(text));
				break;
			case 'cpf':
				onChangeText(maskCpf(text));
				break;
			case 'cnpj':
				onChangeText(maskCnpj(text));
				break;
			case 'phone':
				onChangeText(maskPhone(text));
				break;
			case 'cep':
				onChangeText(maskCep(text));
				break;
			case 'data':
				onChangeText(maskDate(text));
				break;
			case 'money':
				onChangeText(maskMoney(text));
				break;
			default:
				break;
		}
	};
}

module.exports = {
	maskNumber,
	maskCpf,
	maskCnpj,
	maskPhone,
	maskCep,
	maskMoney,
	maskDate,
	maskText
};
