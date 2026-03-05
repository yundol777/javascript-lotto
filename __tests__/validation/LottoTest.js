import WinningLotto from "../../src/models/WinningLotto.js";

describe("당첨 로또 번호 입력와 보너스 번호 입력에 공통적으로 적용되는 검증", () => {
  // input: ""
  test("숫자는 비어있을 수 없습니다.", () => {
    const number = "";
    const winningLotto = new WinningLotto();
    expect(() => winningLotto.setWinningNumbers(number)).toThrow("[Error]");
  });

  // input: a, -1, 0.1
  test("숫자는 자연수여야 합니다.", () => {
    const number = "10";
    const winningLotto = new WinningLotto();
    expect(() => winningLotto.setWinningNumbers(number)).toThrow("[Error]");
  });

  // input: 58, 100
  test("숫자는 1부터 45까지여야 합니다.", () => {
    const number = "58";
    const winningLotto = new WinningLotto();
    expect(() => winningLotto.setWinningNumbers(number)).toThrow("[Error]");
  });
});

describe("당첨 로또 번호 입력 시 적용되는 검증", () => {
  // input: [1,2,3,4,5], [1,2,3,4,5,6,7]
  test("배열 안의 값은 6개여야 합니다.", () => {
    const numbers = "1,2,3,4,5";
    const winningLotto = new WinningLotto();
    expect(() => winningLotto.setWinningNumbers(numbers)).toThrow("[Error]");
  });

  // input: [1,1,2,3,4,5]
  test("배열 안의 값은 중복되어서는 안됩니다.", () => {
    const numbers = "1,1,2,3,4,5";
    const winningLotto = new WinningLotto();
    expect(() => winningLotto.setWinningNumbers(numbers)).toThrow("[Error]");
  });
});

describe("보너스 번호 입력 시 적용되는 검증", () => {
  // input: 1 / [1,2,3,4,5,6]
  test("보너스 번호는 당첨 로또 번호와 중복될 수 없습니다.", () => {
    const winningNumbers = "1,2,3,4,5,6";
    const bonusNumber = "1";

    const winningLotto = new WinningLotto();
    winningLotto.setWinningNumbers(winningNumbers);

    expect(() => winningLotto.setBonusNumber(bonusNumber)).toThrow("[Error]");
  });

  test("보너스 번호는 당첨 번호가 먼저 존재해야합니다.", () => {
    const bonusNumber = "1";
    const winningLotto = new WinningLotto();
    expect(() => winningLotto.setBonusNumber(bonusNumber)).toThrow("[Error]");
  });
});
