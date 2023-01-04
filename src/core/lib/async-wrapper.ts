type AsyncFn<T> = (...args: Array<T>) => Promise<T>;

const asyncWrapper = <T>(asyncFn: AsyncFn<T>) => {
  return (...args: Array<T>) => {
    return Promise.resolve(asyncFn.call(null, ...args)).catch((e) => {
      throw new Error(e);
    });
  };
};
