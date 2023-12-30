/**
 * Format number as: 100000.00 to 100.000,00
 */
export function formatMoneyBR(value: number) {
  if (typeof value !== 'number') throw new Error('Param is not a string');
  return value
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

/**
 * Format Placa automotiva
 */
export function formatPlacaOld(value: string) {
  if (typeof value !== 'string') throw new Error('Param is not a string');
  return value.toUpperCase().replace(/([A-Z]{3})([0-9]{4})/, '$1-$2');
}
