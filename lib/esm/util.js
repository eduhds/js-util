"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isColorLight = exports.getRandomHexColor = exports.getCreditCardBrand = exports.bytesToSize = void 0;
/**
 * Transform bytes to size
 * @example
 * // returns 512,00 B
 * bytesToSize(512);
 */
function bytesToSize(bytes) {
    const unities = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unityIndex = 0;
    let size = bytes;
    while (size >= 1024 && unityIndex < unities.length - 1) {
        unityIndex++;
        size /= 1024;
    }
    let unity = unities[unityIndex];
    return size.toFixed(2).replace('.', ',') + ' ' + unity;
}
exports.bytesToSize = bytesToSize;
/**
 * Get credit card brand
 * @example
 * // returns 'Visa'
 * getCreditCardBrand('4111111111111111');
 * // returns 'Mastercard'
 * getCreditCardBrand('5555555555554444');
 */
function getCreditCardBrand(cardNumber) {
    const cardTypes = {
        'American Express': /^3[47]/,
        'Diners Club': /^30[0-5]/,
        Discover: /^6(?:011|5)/,
        JCB: /^(?:2131|1800|35\d{3})/,
        Elo: /^4011|4389|4576|5049|6277|6363|6371|6375|6380|6381|6382|6385|6386|6387|6388|6390|6759|6771|6880|6881|6882|6883|6884|6885|6886|6887|6888|6889|6890|7751|7752|7753|7754|7755|7756|7757|7758|7759|7760|7761|7762|7763|7764|7765|7766|7767|7768|7769|7770|7771|7772|7773|7774|7775|7776|7777|7778|7779|7780|7781|7782|7783|7784|7785|7786|7787|7788|7789|7790|7791|7792|7793|7794|7795|7796|7797|7798|7799|8050|8060|8070|8080|8090|8250|8260|8270|8280|8290|8350|8360|8370|8380|8390|9250|9260|9270|9280|9290|9550|9560|9570|9580|9590|9850|9860|9870|9880|9890|9910|9920|9930|9940|9950|9960|9970|9980|9990/,
        Hipercard: /^3841|6372|6373|6374|6375|6376|6377|6378|6379|6380|6381|6382|6383|6384|6385|6386|6387|6388|6389|6390|6771|6772|6773|6774|6775|6776|6777|6778|6779|6780|6781|6782|6783|6784|6785|6786|6787|6788|6789|6790|7053|7054|7055|7056|7057|7058|7059|7060|7061|7062|7063|7064|7065|7066|7067|7068|7069|7070/,
        Visa: /^4/,
        Mastercard: /^5[1-5]/
    };
    for (const brand in cardTypes) {
        if (cardTypes[brand].test(cardNumber)) {
            return brand;
        }
    }
    return 'Unknown';
}
exports.getCreditCardBrand = getCreditCardBrand;
/**
 * Get random hex color
 * @example
 * // returns #AABBCC (random color)
 * getRandomHexColor();
 */
function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
exports.getRandomHexColor = getRandomHexColor;
/**
 * Check if hex color is light
 * @example
 * // returns true
 * isColorLight('#FFFFFF');
 * // returns false
 * isColorLight('#000000');
 */
function isColorLight(hex) {
    if (!hex || hex.length < 7 || !hex.startsWith('#')) {
        throw new Error('Invalid hex color');
    }
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');
    // Parse r, g, b values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // If luminance is greater than 128, the color is light
    return luminance > 128;
}
exports.isColorLight = isColorLight;
