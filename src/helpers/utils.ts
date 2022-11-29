export const isFunction = (val: unknown): val is () => void =>
  typeof val === 'function';

export const isObject = (
  val: unknown
): val is Record<string | number | symbol, unknown> =>
  val !== null && typeof val === 'object';

export const isPromise = <T = unknown>(params: unknown): params is Promise<T> =>
  isObject(params) && isFunction(params.then) && isFunction(params.catch);

export const sleep = (time: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, time));

export const NOOP = () => {
  // do nothing
};
