async () => {
  type Result<T, E> = Success<T, E> | Failure<T, E>;

  // Rust の場合は enum を使用しているが TS なので Union 型
  //
  // enum Result<T, E> {
  //   Ok(T),
  //   Err(E),
  // }
  //

  // TypeScript は構造的部分型なので独自のプロパティがないと型推論できない
  // ただしプロパティを static にすると型推論されなくなるので付けないこと

  class Success<T, E> {
    private readonly type = 'success';
    // private readonly success: never // これでもよい

    constructor(readonly value: T) {}

    isSuccess(): this is Success<T, E> {
      return true;
    }
    isFailure(): this is Failure<T, E> {
      return false;
    }
  }

  class Failure<T, E> {
    private readonly type = 'failure';
    // private readonly failure: never  // これでもよい

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
    result; // Success<string, string> と推論される
  } else {
    result; // Failure<string, string> と推論される
  }
};
