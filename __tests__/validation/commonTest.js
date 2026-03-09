import { ERROR_MESSAGE } from "../../src/constants/message";
import { isRetryAnswerValid } from "../../src/validates/RetryAnswerValidator";

describe("구매 금액 입력에 적용되는 검증", () => {
  test("y를 입력하면 true를 반환한다.", () => {
    expect(isRetryAnswerValid("y")).toBe(true);
  });

  test("n을 입력하면 false를 반환한다.", () => {
    expect(isRetryAnswerValid("n")).toBe(false);
  });

  test("y/n 이 아닌 값을 입력하면 예외가 발생한다.", () => {
    expect(() => isRetryAnswerValid("a")).toThrow(ERROR_MESSAGE.RETRY.INVALID_RETRY);
  });
});
