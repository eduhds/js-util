export default class HttpHelper {
  async execute(...args) {
    try {
      const [request, parseResult, ...rest] = args;

      const res = await request.call(null, ...rest);

      if (parseResult) {
        try {
          const resParsed = parseResult(res);
          return [resParsed, null];
        } catch (error) {
          return [null, error];
        }
      }

      return [res, null];
    } catch (error) {
      return [null, error];
    }
  }
}
