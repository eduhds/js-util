export type ExecuteRequest = (...args: Array<any>) => Promise<any>;
export type ExecuteParseResponse = (response: any) => any;
export type ExecuteRestArgs = Array<any>;
export type ExecuteResult = [any | null, any | null];

interface IHttpHelper {
  execute: (
    request: ExecuteRequest,
    parseResponse: ExecuteParseResponse,
    ...rest: ExecuteRestArgs
  ) => Promise<ExecuteResult>;
}

class HttpHelper implements IHttpHelper {}

export default HttpHelper;
