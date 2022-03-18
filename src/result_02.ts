async () => {
  type Result<T, E> = Success<T, E> | Failure<T, E>;

  class Success<T, E> {
    private readonly success = true;
    private readonly failure = false;

    constructor(readonly value: T) {}

    isSuccess(): this is Success<T, E> {
      return this.success;
    }
    isFailure(): this is Failure<T, E> {
      return this.failure;
    }
  }

  class Failure<T, E> {
    private readonly success = false;
    private readonly failure = true;

    constructor(readonly value: E) {}

    isSuccess(): this is Success<T, E> {
      return this.success;
    }
    isFailure(): this is Failure<T, E> {
      return this.failure;
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
    result; // Success<string, string> と推論される
  } else {
    result; // Failure<string, string> と推論される
  }
};
