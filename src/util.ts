import { SplitCharacter } from './@types/object';
import { splitSegmentsToObjectFields } from './object';

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

/**
 * Get credit card brand
 * @example
 * // returns 'Visa'
 * getCreditCardBrand('4111111111111111');
 * // returns 'Mastercard'
 * getCreditCardBrand('5555555555554444');
 */
export function getCreditCardBrand(cardNumber: string) {
  const cardTypes: { [key: string]: RegExp } = {
    'American Express': /^3[47]/,
    'Diners Club': /^30[0-5]/,
    Discover: /^6(?:011|5)/,
    JCB: /^(?:2131|1800|35\d{3})/,
    Elo: /^4011|4389|4576|5049|6277|6363|6371|6375|6380|6381|6382|6385|6386|6387|6388|6390|6759|6771|6880|6881|6882|6883|6884|6885|6886|6887|6888|6889|6890|7751|7752|7753|7754|7755|7756|7757|7758|7759|7760|7761|7762|7763|7764|7765|7766|7767|7768|7769|7770|7771|7772|7773|7774|7775|7776|7777|7778|7779|7780|7781|7782|7783|7784|7785|7786|7787|7788|7789|7790|7791|7792|7793|7794|7795|7796|7797|7798|7799|8050|8060|8070|8080|8090|8250|8260|8270|8280|8290|8350|8360|8370|8380|8390|9250|9260|9270|9280|9290|9550|9560|9570|9580|9590|9850|9860|9870|9880|9890|9910|9920|9930|9940|9950|9960|9970|9980|9990/,
    Hipercard:
      /^3841|6372|6373|6374|6375|6376|6377|6378|6379|6380|6381|6382|6383|6384|6385|6386|6387|6388|6389|6390|6771|6772|6773|6774|6775|6776|6777|6778|6779|6780|6781|6782|6783|6784|6785|6786|6787|6788|6789|6790|7053|7054|7055|7056|7057|7058|7059|7060|7061|7062|7063|7064|7065|7066|7067|7068|7069|7070/,
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

/**
 * Get random hex color
 * @example
 * // returns #AABBCC (random color)
 * getRandomHexColor();
 */
export function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Check if hex color is light
 * @example
 * // returns true
 * isColorLight('#FFFFFF');
 * // returns false
 * isColorLight('#000000');
 */
export function isColorLight(hex: string) {
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

/**
 * Download file from blob
 * @example
 * // downloads file from blob
 * browserDownloadBlob(blob, 'file.pdf', 'application/pdf');
 */
export function browserDownloadBlob(
  data: number[] | string | Blob,
  fileName: string,
  mimeType: string
) {
  const blob =
    data instanceof Blob
      ? data
      : new Blob([typeof data === 'string' ? data : new Uint8Array(data)], {
          type: mimeType
        });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(function () {
    return window.URL.revokeObjectURL(url);
  }, 1000);
}

/**
 * Create http client
 * @experimental
 */
export function http() {
  type KVPairs<K = string, V = string> = [K, V][];
  type Param<T extends string = string> = `\$${T}`;

  const _baseUrl = '';
  const _protocol = '';
  const _domain = '';
  const _body: any = undefined;
  const _headers = {} as Record<string, string>;
  const _query = {} as Record<string, string | number | boolean | undefined | null>;
  const _params = {} as Record<Param, string>;

  const _paths: readonly string[] = [];

  function request(...args: Parameters<typeof fetch>) {
    return fetch(...args);
  }

  function findParams(url: string, params: typeof _params) {
    return url.split('/').reduce((acc, part) => {
      const param = part.startsWith('$') ? (part as Param) : undefined;
      if (param) {
        acc[param] = String(undefined);
      }
      return acc;
    }, params);
  }

  function replaceParams(url: string, params: typeof _params) {
    for (const param in params) {
      url = url.replace(param, params[param as Param]);
    }
    return url;
  }

  function kvPairsToRecord<K extends string, V>(
    keyValuePairs: KVPairs<K, V>,
    record: Record<K, V>
  ) {
    return keyValuePairs.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, record);
  }

  function normalizeUrl(url: string) {
    return url.replace(/\/+/g, '/').replace(':/', '://');
  }

  return {
    _baseUrl,
    _protocol,
    _domain,
    _body,
    _headers,
    _query,
    _params,
    _paths,
    url(url: string, ...parameters: KVPairs<Param, string>) {
      if (!url) throw new Error('url is required');

      const [partialUrl, queryString] = url.trim().split('?');

      const query = queryString
        ? queryString.split('&').reduce((acc, param) => {
            const [key, value] = param.split('=');
            acc[key] = value;
            return acc;
          }, this._query)
        : {};

      const [protocol, address] = partialUrl.split('://');
      if (protocol !== 'http' && protocol !== 'https') {
        throw new Error('Invalid protocol');
      }

      const [domain, ...path] = address.split('/').filter(Boolean);

      const params = findParams(path.join('/'), _params);

      const baseUrl = normalizeUrl(
        replaceParams(
          [`${protocol}://${domain}`, ...path].join('/'),
          kvPairsToRecord(parameters, params)
        )
      );

      this._baseUrl = baseUrl;
      this._protocol = protocol;
      this._domain = domain;
      this._query = query;
      this._params = params;

      return this;
    },
    headers(...keyValuePairs: KVPairs) {
      this._headers = kvPairsToRecord(keyValuePairs, this._headers);
      return this;
    },
    routes<T extends readonly string[], S extends SplitCharacter = '/'>(
      paths: readonly [...T],
      separator: S = '/' as S
    ) {
      this._paths = paths;

      for (const path of paths) {
        this._params = findParams(path, this._params);
      }

      return splitSegmentsToObjectFields(paths, {
        separator,
        finalValue: index => {
          const _body: any = undefined;

          const url = normalizeUrl([this._baseUrl, this._paths[index]].join('/'));

          const requestFn = (method: string, config: any) => {
            const { _headers: headers, _body: body, _params } = config;
            return request(replaceParams(url, _params), { method, headers, body });
          };

          return {
            _body,
            _headers: this._headers,
            _params: this._params,
            body(body: any) {
              this._body = body;
              return this;
            },
            headers(keyValuePairs: KVPairs) {
              this._headers = kvPairsToRecord(keyValuePairs, this._headers);
              return this;
            },
            get(...parameters: KVPairs<Param, string>) {
              const _params = kvPairsToRecord(parameters, { ...this._params });
              return requestFn('GET', { ...this, _params });
            },
            post(...parameters: KVPairs<Param, string>) {
              const _params = kvPairsToRecord(parameters, { ...this._params });
              return requestFn('POST', { ...this, _params });
            },
            put(...parameters: KVPairs<Param, string>) {
              const _params = kvPairsToRecord(parameters, { ...this._params });
              return requestFn('PUT', { ...this, _params });
            },
            patch(...parameters: KVPairs<Param, string>) {
              const _params = kvPairsToRecord(parameters, { ...this._params });
              return requestFn('PATCH', { ...this, _params });
            },
            delete(...parameters: KVPairs<Param, string>) {
              const _params = kvPairsToRecord(parameters, { ...this._params });
              return requestFn('DELETE', { ...this, _params });
            }
          };
        }
      });
    }
  };
}

/* // Utilitário para transformar union de objetos em interseção (merge de propriedades)
type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void
  ? I
  : never;

// Função acumuladora com tipagem do array
function accumulate<T extends object[]>(...arr: readonly [...T]): UnionToIntersection<T[number]> {
  return arr.reduce(
    (acc, cur) => ({
      ...acc,
      ...cur
    }),
    {}
  ) as UnionToIntersection<T[number]>;
}
 */
