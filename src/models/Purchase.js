import { LOTTO_COST } from "../constants/config.js";
import {
  isInputEmpty,
  isPositiveInteger,
} from "../validates/CommonValidator.js";
import { isValidUnit, isTooLarge } from "../validates/PurchaseValidator.js";

class Purchase {
  #money;

  constructor(input) {
    this.#validate(input);
    this.#money = Number(input);
  }

  #validate(input) {
    if (isInputEmpty(input)) {
      throw new Error("[ERROR]");
    }

    if (!isPositiveInteger(input)) {
      throw new Error("[ERROR]");
    }

    if (!isValidUnit(input)) {
      throw new Error("[ERROR]");
    }

    if (isTooLarge(input)) {
      throw new Error("[ERROR]");
    }
  }

  getLottoCount() {
    return this.#money / LOTTO_COST;
  }
}

export default Purchase;
