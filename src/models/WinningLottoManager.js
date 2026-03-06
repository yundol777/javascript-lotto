import { ERROR_MESSAGE } from "../constants/message.js";
import { commonValidate } from "../validates/CommonValidator.js";
import { isNumberInArray } from "../validates/LottoValidator.js";
import Lotto from "./Lotto.js";

class WinningLottoManager extends Lotto {
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

  #validateBonusNumber(bonusNumber) {
    if (!commonValidate(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.COMMON.INVALID_NUMBER);
    }

    if (isNumberInArray(Number(bonusNumber), this.#winningNumbers)) {
      throw new Error(ERROR_MESSAGE.BONUS.DUPLICATE);
    }
  }

  compareWithWinningLotto(lottoNumbers) {
    const winningNumbers = this.#winningNumbers;
    const matchCount = winningNumbers.filter((number) => lottoNumbers.includes(number)).length;
    const hasBonus = lottoNumbers.includes(this.#bonusNumber);

    return {
      matchCount,
      hasBonus,
    };
  }
}

export default WinningLottoManager;
