import { LOTTO_COUNT } from "../constants/config.js";
import { commonValidate } from "../validates/CommonValidator.js";
import { isArrayInLength, isArrayUnique } from "../validates/LottoValidator.js";

class Lotto {
  #numbers;

  //numbers type: 배열
  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (!numbers.every((number) => commonValidate(number))) {
      throw new Error("[Error]");
    }

    if (!isArrayInLength(numbers, LOTTO_COUNT)) {
      throw new Error("[Error]");
    }

    if (!isArrayUnique(numbers)) {
      throw new Error("[Error] 중복");
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
