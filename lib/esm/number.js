/**
 * Parse number with flexible separators
 * @example
 * // returns 1
 * parseFlexibleNumber('1')
 * // returns -1
 * parseFlexibleNumber('-1')
 * // returns 1000000.5
 * parseFlexibleNumber('1.000.000,50')
 */
export function parseFlexibleNumber(str) {
    if (!str)
        return 0;
    // Regex para encontrar porção numérica (suporta negativos, milhar, decimal)
    const match = str.match(/-?\d{1,}([.,]\d{3})*([.,]\d+)?|-?\d+([.,]\d+)?/);
    if (!match)
        return NaN;
    let numStr = match[0].replace(/\s/g, '');
    // Determinar separadores de decimal e milhar
    const lastDot = numStr.lastIndexOf('.');
    const lastComma = numStr.lastIndexOf(',');
    if (lastDot !== -1 && lastComma !== -1) {
        // Ambos presentes: o último define o decimal
        if (lastDot > lastComma) {
            // Separador decimal é ponto
            const [left, right] = [numStr.slice(0, lastDot).replace(/,/g, ''), numStr.slice(lastDot + 1)];
            numStr = `${left}.${right}`;
        }
        else {
            // Separador decimal é virgula
            const [left, right] = [
                numStr.slice(0, lastComma).replace(/\./g, ''),
                numStr.slice(lastComma + 1)
            ];
            numStr = `${left}.${right}`;
        }
    }
    else if (lastComma !== -1) {
        // Só vírgula
        const [left, right] = [
            numStr.slice(0, lastComma).replace(/\,/g, ''),
            numStr.slice(lastComma + 1)
        ];
        // Se houver mais de uma vírgula, não é número decimal
        const commaCount = (numStr.match(/,/g) || []).length;
        if (commaCount > 1) {
            numStr = `${left}${right}`;
        }
        else {
            numStr = `${left}.${right}`;
        }
    }
    else if (lastDot !== -1) {
        // Só ponto
        const [left, right] = [numStr.slice(0, lastDot).replace(/\./g, ''), numStr.slice(lastDot + 1)];
        // Se houver mais de um ponto, não é número decimal
        const dotCount = (numStr.match(/\./g) || []).length;
        if (dotCount > 1) {
            numStr = `${left}${right}`;
        }
        else {
            numStr = `${left}.${right}`;
        }
    }
    return Number(numStr);
}
