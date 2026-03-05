import {
  isInputEmpty,
  isPositiveInteger,
} from "../validates/CommonValidator.js";
import {
  isNumberInRange,
  isArrayInLength,
  isArrayUnique,
  isNumberInArray,
} from "../validates/LottoValidator.js";

class LottoResult {
  #winningNumbers;
  #bonusNumber;

  setWinningNumbers(winningNumbersInput) {
    const parsedWinningNumbers = winningNumbersInput.split(",");
    // 배열 안 각 숫자에 대한 유효성 검증
    parsedWinningNumbers.forEach((number) => {
      this.#validateCommon(number);
    });

    const winningNumbers = parsedWinningNumbers.map(Number);
    //배열 자체의 유효성 검증
    this.#validateWinningNumbers(winningNumbers);

    this.#winningNumbers = winningNumbers;
  }

  setBonusNumber(bonusNumberInput) {
    this.#validateCommon(bonusNumberInput);

    const bonusNumber = Number(bonusNumberInput);

    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateCommon(number) {
    if (isInputEmpty(number)) {
      throw new Error("[Error]");
    }

    if (!isPositiveInteger(number)) {
      throw new Error("[Error]");
    }

    if (!isNumberInRange(number)) {
      throw new Error("[Error]");
    }
  }

  #validateWinningNumbers(winningNumbers) {
    if (!isArrayInLength(winningNumbers, 6)) {
      throw new Error("[Error]");
    }

    if (!isArrayUnique(winningNumbers)) {
      throw new Error("[Error]");
    }
  }

  #validateBonusNumber(bonusNumber) {
    // if (!this.#winningNumbers) {
    //   throw new Error("[Error]");
    // }
    if (isNumberInArray(bonusNumber, this.#winningNumbers)) {
      throw new Error("[Error]");
    }
  }
}

export default LottoResult;
