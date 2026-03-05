import { commonValidate } from "../validates/CommonValidator.js";
import {
  isNumberInArray,
  isWinningNumbersExist,
} from "../validates/LottoValidator.js";
import Lotto from "./Lotto.js";

class WinningLotto extends Lotto {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbersInput) {
    const parsedWinningNumbers = winningNumbersInput.split(",").map(Number);
    super(parsedWinningNumbers);
    this.#winningNumbers = parsedWinningNumbers;
  }

  setBonusNumber(bonusNumberInput) {
    this.#validateBonusNumber(bonusNumberInput);
    this.#bonusNumber = Number(bonusNumberInput);
  }

  compareWithWinningLotto(lottoNumbers) {
    const winningNumbers = this.#winningNumbers;
    const matchCount = winningNumbers.filter((number) =>
      lottoNumbers.includes(number),
    ).length;
    const hasBonus = lottoNumbers.includes(this.#bonusNumber);

    return {
      matchCount,
      hasBonus,
    };
  }

  #validateBonusNumber(bonusNumber) {
    if (!isWinningNumbersExist(this.#winningNumbers)) {
      throw new Error("[Error]");
    }

    if (!commonValidate(bonusNumber)) {
      throw new Error("[Error]");
    }

    if (isNumberInArray(Number(bonusNumber), this.#winningNumbers)) {
      throw new Error("[Error]");
    }
  }
}

export default WinningLotto;
