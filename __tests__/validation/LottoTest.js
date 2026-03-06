import { ERROR_MESSAGE } from "../../src/constants/message.js";
import WinningLottoManager from "../../src/models/winningLottoManager.js";

const INVALID_INPUT_CASES = [
  { desc: "숫자는 비어있을 수 없습니다.", input: "", expected: ERROR_MESSAGE.LOTTO.INVALID_NUMBER },
  { desc: "숫자는 자연수여야 합니다.", input: "a", expected: ERROR_MESSAGE.LOTTO.INVALID_NUMBER },
  { desc: "숫자는 1부터 45까지여야 합니다.", input: "58", expected: ERROR_MESSAGE.LOTTO.INVALID_NUMBER },
];

const INVALID_LENGTH = "1,2,3,4,5";
const DUPLICATE_NUMBERS = "1,1,2,3,4,5";
const VALID_WINNING_NUMBERS = "1,2,3,4,5,6";
const BONUS_DUPLICATE = "1";

describe("당첨 로또 번호 입력와 보너스 번호 입력에 공통적으로 적용되는 검증", () => {
  INVALID_INPUT_CASES.forEach(({ desc, input, expected }) => {
    test(desc, () => {
      expect(() => new WinningLottoManager(input)).toThrow(expected);
    });
  });
});

describe("당첨 로또 번호 입력 시 적용되는 검증", () => {
  test("배열 안의 값은 6개여야 합니다.", () => {
    expect(() => new WinningLottoManager(INVALID_LENGTH)).toThrow(ERROR_MESSAGE.LOTTO.INVALID_LENGTH);
  });

  test("배열 안의 값은 중복되어서는 안됩니다.", () => {
    expect(() => new WinningLottoManager(DUPLICATE_NUMBERS)).toThrow(ERROR_MESSAGE.LOTTO.DUPLICATE);
  });
});

describe("보너스 번호 입력 시 적용되는 검증", () => {
  test("보너스 번호는 당첨 로또 번호와 중복될 수 없습니다.", () => {
    const winningLottoManager = new WinningLottoManager(VALID_WINNING_NUMBERS);
    expect(() => winningLottoManager.setBonusNumber(BONUS_DUPLICATE)).toThrow(ERROR_MESSAGE.BONUS.DUPLICATE);
  });
});
