async () => {
  interface Result<T, E> {
    isSuccess(): boolean;
    isFailure(): boolean;
  }

  class Success<T, E> implements Result<T, E> {
    constructor(readonly value: T) {}
    isSuccess(): this is Success<T, E> {
      return true;
    }
    isFailure(): this is Failure<T, E> {
      return false;
    }
  }

  class Failure<T, E> implements Result<T, E> {
    constructor(readonly value: E) {}
    isSuccess(): this is Success<T, E> {
      return false;
    }
    isFailure(): this is Failure<T, E> {
      return true;
    }
  }

  function doSomething(x: boolean): Result<string, string> {
    if (x) {
      return new Success('success');
    } else {
      return new Failure('failure');
    }
  }

  const result = doSomething(true);

  if (result.isSuccess()) {
    result;
  } else {
    result;
  }
};
