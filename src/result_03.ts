// @ref https://github.com/karen-irc/option-t/blob/main/src/PlainResult/Result.ts

async () => {
  type Result<T, E> = Success<T> | Failure<E>;

  class Success<T> {
    readonly isSuccess = true;
    constructor(readonly value: T) {}
  }

  class Failure<E> {
    readonly isSuccess = false;
    constructor(readonly value: E) {}
  }

  function doSomething(x: boolean): Result<string, string> {
    if (x) {
      return new Success('success');
    } else {
      return new Failure('failure');
    }
  }

  const result = doSomething(true);

  if (result.isSuccess) {
    result; // Success<string, string> と推論される
  } else {
    result; // Failure<string, string> と推論される
  }
};
