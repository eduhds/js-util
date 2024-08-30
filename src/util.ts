/**
 * Transform bytes to size
 * @example
 * // returns 512,00 B
 * bytesToSize(512);
 */
export function bytesToSize(bytes: number) {
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
