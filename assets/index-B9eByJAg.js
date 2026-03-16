(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const LOTTO_COST = 1e3;
const LOTTO_COUNT = 6;
const LOTTO_RANK = {
  "5th": {
    matchCount: 3,
    money: 5e3,
    requireBonus: false
  },
  "4th": {
    matchCount: 4,
    money: 5e4,
    requireBonus: false
  },
  "3rd": {
    matchCount: 5,
    money: 15e5,
    requireBonus: false
  },
  "2nd": {
    matchCount: 5,
    money: 3e7,
    requireBonus: true
  },
  "1st": {
    matchCount: 6,
    money: 2e9,
    requireBonus: false
  }
};
const ERROR_MESSAGE = {
  COMMON: {
    INVALID_NUMBER: "[ERROR] 숫자 형식이 올바르지 않습니다."
  },
  LOTTO: {
    INVALID_NUMBER: "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.",
    INVALID_LENGTH: "[ERROR] 로또 번호는 6개여야 합니다.",
    DUPLICATE: "[ERROR] 로또 번호는 중복될 수 없습니다."
  },
  PURCHASE: {
    INVALID_UNIT: "[ERROR] 구입 금액은 1,000원 단위여야 합니다.",
    TOO_LARGE: "[ERROR] 구입 금액이 너무 큽니다."
  },
  BONUS: {
    DUPLICATE: "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다."
  }
};
function commonValidate(input) {
  if (isInputEmpty(input)) return false;
  if (!isPositiveInteger(input)) return false;
  if (!isNumberInRange(input)) return false;
  return true;
}
function isInputEmpty(input) {
  return input === "";
}
function isPositiveInteger(input) {
  return /^[1-9]\d*$/.test(input);
}
function isNumberInRange(input) {
  return Number(input) >= 1 && Number(input) <= 45;
}
function isValidUnit(input) {
  return Number(input) % LOTTO_COST === 0;
}
function isTooLarge(input) {
  return BigInt(input) > BigInt(Number.MAX_SAFE_INTEGER);
}
class Purchase {
  #money;
  constructor(moneyInput) {
    this.#validate(moneyInput);
    this.#money = Number(moneyInput);
  }
  #validate(input) {
    if (isInputEmpty(input)) {
      throw new Error(ERROR_MESSAGE.COMMON.INVALID_NUMBER);
    }
    if (!isPositiveInteger(input)) {
      throw new Error(ERROR_MESSAGE.COMMON.INVALID_NUMBER);
    }
    if (isTooLarge(input)) {
      throw new Error(ERROR_MESSAGE.PURCHASE.TOO_LARGE);
    }
    if (!isValidUnit(input)) {
      throw new Error(ERROR_MESSAGE.PURCHASE.INVALID_UNIT);
    }
  }
  getLottoTicketCount() {
    return this.#money / LOTTO_COST;
  }
}
function isArrayInLength(array, length) {
  return array.length === length;
}
function isArrayUnique(array) {
  const uniqueSet = new Set(array);
  return uniqueSet.size === array.length;
}
function isNumberInArray(number, array) {
  return array.includes(number);
}
class Lotto {
  #numbers;
  constructor(numbersInput) {
    this.#validate(numbersInput);
    this.#numbers = numbersInput.sort((a, b) => a - b);
  }
  #validate(numbers) {
    if (!numbers.every((number) => commonValidate(number))) {
      throw new Error(ERROR_MESSAGE.LOTTO.INVALID_NUMBER);
    }
    if (!isArrayInLength(numbers, LOTTO_COUNT)) {
      throw new Error(ERROR_MESSAGE.LOTTO.INVALID_LENGTH);
    }
    if (!isArrayUnique(numbers)) {
      throw new Error(ERROR_MESSAGE.LOTTO.DUPLICATE);
    }
  }
  getNumbers() {
    const numbers = [...this.#numbers];
    return numbers;
  }
}
class WinningLottoManager extends Lotto {
  #winningLottos;
  #bonusNumber;
  constructor(winningLottosInput) {
    const parsedWinningLottos = winningLottosInput.split(",").map(Number);
    super(parsedWinningLottos);
    this.#winningLottos = parsedWinningLottos;
  }
  setBonusNumber(bonusNumberInput) {
    this.#validateBonusNumber(bonusNumberInput);
    this.#bonusNumber = Number(bonusNumberInput);
  }
  #validateBonusNumber(bonusNumber) {
    if (!commonValidate(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.COMMON.INVALID_NUMBER);
    }
    if (isNumberInArray(Number(bonusNumber), this.#winningLottos)) {
      throw new Error(ERROR_MESSAGE.BONUS.DUPLICATE);
    }
  }
  compareWithWinningLotto(lottoTicket) {
    const winningLottos = this.#winningLottos;
    const matchCount = winningLottos.filter((number) => lottoTicket.includes(number)).length;
    const hasBonus = lottoTicket.includes(this.#bonusNumber);
    return {
      matchCount,
      hasBonus
    };
  }
}
function pickUniqueNumbersInRange(startInclusive, endInclusive, count) {
  validateRange(startInclusive, endInclusive, count);
  const numbers = [];
  for (let i = startInclusive; i <= endInclusive; i++) {
    numbers.push(i);
  }
  shuffle(numbers);
  return numbers.slice(0, count);
}
function validateRange(startInclusive, endInclusive, count) {
  if (!Number.isInteger(startInclusive) || !Number.isInteger(endInclusive) || !Number.isInteger(count)) {
    throw new Error("숫자는 정수여야 합니다.");
  }
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
class LottoMachine {
  #generatedLottos;
  constructor(lottoCount) {
    this.#generatedLottos = this.#generateLottos(lottoCount);
  }
  getLottoTickets() {
    const lottos = this.#generatedLottos.map((lotto) => {
      return lotto.getNumbers();
    });
    return lottos;
  }
  #generateLottos(lottoCount) {
    const lottos = [];
    for (let _ = 0; _ < lottoCount; _++) {
      const numbers = pickUniqueNumbersInRange(1, 45, 6);
      lottos.push(new Lotto(numbers));
    }
    return lottos;
  }
}
function resultCalculator(results) {
  const resultData = Object.values(LOTTO_RANK).map((rank) => ({
    ...rank,
    count: 0
  }));
  results.forEach(({ matchCount, hasBonus }) => {
    if (matchCount === 6) resultData[4].count++;
    if (matchCount === 5 && hasBonus) resultData[3].count++;
    if (matchCount === 5 && !hasBonus) resultData[2].count++;
    if (matchCount === 4) resultData[1].count++;
    if (matchCount === 3) resultData[0].count++;
  });
  return resultData;
}
function calculateProfitRate(resultData, purchaseAmount) {
  const totalPrize = resultData.reduce((sum, rank) => {
    return sum + rank.money * rank.count;
  }, 0);
  const rate = totalPrize / purchaseAmount * 100;
  return Math.round(rate * 10) / 10;
}
class LottoResult {
  #lottoResult;
  constructor(winningLottoManager, lottoTickets) {
    this.#calculateResult(winningLottoManager, lottoTickets);
  }
  #calculateResult(winningLottoManager, lottoTickets) {
    this.#lottoResult = lottoTickets.map((lottoTicket) => {
      return winningLottoManager.compareWithWinningLotto(lottoTicket);
    });
  }
  getResult(lottoCount) {
    const resultData = resultCalculator(this.#lottoResult);
    const profitRate = calculateProfitRate(resultData, lottoCount * LOTTO_COST);
    return { resultData, profitRate };
  }
}
class LottosOutputView {
  #section;
  render() {
    this.#section = document.querySelector("#lottos");
    this.#section.innerHTML = "";
  }
  renderLottos(lottos) {
    this.#section.innerHTML = `
      <h2 class="lottos__title">총 ${lottos.length}개를 구매하였습니다.</h2>
      <ul class="lottos__list">
        ${lottos.map(
      (lotto) => `
              <li class="lottos__item">
                <p class="lottos__item-icon">🎟️</p>
                <p class="lottos__item-numbers">${lotto.join(", ")}</p>
              </li>
            `
    ).join("")}
      </ul>
    `;
  }
}
class PurchaseInputView {
  #handler;
  #section;
  constructor(handlePurchaseButton) {
    this.#handler = handlePurchaseButton;
  }
  render() {
    this.#section = document.querySelector("#purchase");
    this.#section.innerHTML = `
      <form class="purchase__form">
        <label class="purchase__title" for="purchaseMoney">
          구입할 금액을 입력해주세요
        </label>

        <div class="purchase__input-group">
          <input
            class="purchase__input"
            type="text"
            inputmode="numeric"
            id="purchaseMoney"
            name="purchaseMoneyInput"
            placeholder="금액"
          />

          <button class="purchase__button" type="submit">
            구입
          </button>
        </div>
      </form>
    `;
    this.#addEventListener();
  }
  #addEventListener() {
    const form = this.#section.querySelector(".purchase__form");
    const input = this.#section.querySelector(".purchase__input");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.#handler(input.value);
    });
  }
}
class ResultOutputView {
  #section;
  #handler;
  constructor(handleRestartButton) {
    this.#handler = handleRestartButton;
  }
  render() {
    this.#section = document.querySelector("#result");
    this.#section.innerHTML = `
          <div class="result__background">
            <div class="result__container">
              <button class="result__close-button">
                ✕
              </button>
              <h3 class="result__title">🏆 당첨 통계 🏆</h3>
              <table class="result__table">
                <thead class="result__table-head">
                  <tr class="result__table-row">
                    <th>일치 갯수</th>
                    <th>당첨금</th>
                    <th>당첨 갯수</th>
                  </tr>
                </thead>
                <tbody class="result__table-body">
                  <tr class="result__table-row">
                    <td>3개</td>
                    <td>5,000</td>
                    <td id="count-3">0개</td>
                  </tr>
                  <tr class="result__table-row">
                    <td>4개</td>
                    <td>50,000</td>
                    <td id="count-4">0개</td>
                  </tr>
                  <tr class="result__table-row">
                    <td>5개</td>
                    <td>1,500,000</td>
                    <td id="count-5">0개</td>
                  </tr>
                  <tr class="result__table-row">
                    <td>5개 + 보너스</td>
                    <td>30,000,000</td>
                    <td id="count-5b">0개</td>
                  </tr>
                  <tr class="result__table-row">
                    <td>6개</td>
                    <td>2,000,000,000</td>
                    <td id="count-6">0개</td>
                  </tr>
                </tbody>
              </table>
              <p class="result__profit">당신의 총 수익률은 <span id="profit-rate">0</span>%입니다.</p>
              <button class="result__restart-button">다시 시작하기</button>
            </div>
          </div>`;
    this.#close();
    this.#addEventListener();
  }
  #addEventListener() {
    const closeButton = this.#section.querySelector(".result__close-button");
    const restartButton = this.#section.querySelector(".result__restart-button");
    closeButton.addEventListener("click", () => this.#close());
    restartButton.addEventListener("click", () => this.#handler());
  }
  #close() {
    this.#section.style.display = "none";
  }
  #open() {
    this.#section.style.display = "block";
  }
  renderResult(resultData, profitRate) {
    this.#open();
    this.#section.querySelector("#count-3").textContent = `${resultData[0].count}개`;
    this.#section.querySelector("#count-4").textContent = `${resultData[1].count}개`;
    this.#section.querySelector("#count-5").textContent = `${resultData[2].count}개`;
    this.#section.querySelector("#count-5b").textContent = `${resultData[3].count}개`;
    this.#section.querySelector("#count-6").textContent = `${resultData[4].count}개`;
    this.#section.querySelector("#profit-rate").textContent = profitRate;
  }
}
class WinningInputView {
  #section;
  #handler;
  constructor(handleResultButton) {
    this.#handler = handleResultButton;
  }
  render() {
    this.#section = document.querySelector("#winning");
    this.#section.innerHTML = `<form class="winning__form">
            <p class="winning__title">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
            <div class="winning__input-group">
              <div class="winning__lotto">
                <p class="winning__input-title">당첨 번호</p>
                <div class="winning__lotto-inputs">
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                </div>
              </div>
              <div class="winning__bonus">
                <p class="winning__input-title">보너스 번호</p>
                <div class="winning__bonus-input">
                  <input class="winning__input" type="text" inputmode="numeric" maxlength="2" />
                </div>
              </div>
            </div>
            <button class="winning__button">결과 확인하기</button>
          </form>`;
    this.#hide();
    this.#addEventListener(this.#section);
  }
  #addEventListener(section) {
    const form = section.querySelector(".winning__form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const lottoInputs = section.querySelectorAll(".winning__lotto-inputs input");
      const bonusInput = section.querySelector(".winning__bonus-input input");
      const winningNumbers = [...lottoInputs].map((i) => Number(i.value)).join(",");
      const bonusNumber = Number(bonusInput.value);
      this.#handler(winningNumbers, bonusNumber);
    });
  }
  show() {
    this.#section.style.display = "block";
  }
  #hide() {
    this.#section.style.display = "none";
  }
}
class MainController {
  #purchaseInputView;
  #lottosOutputView;
  #winningInputView;
  #resultOutputView;
  #lottoTickets;
  #lottoTicketCount;
  constructor() {
    this.#purchaseInputView = new PurchaseInputView((purchaseMoneyInput) => this.#handlePurchaseButton(purchaseMoneyInput));
    this.#lottosOutputView = new LottosOutputView();
    this.#winningInputView = new WinningInputView((winningLottoInput, bonusNumberInput) => this.#handleResultButton(winningLottoInput, bonusNumberInput));
    this.#resultOutputView = new ResultOutputView(() => this.#handleRestartButton());
  }
  async run() {
    this.#purchaseInputView.render();
    this.#lottosOutputView.render();
    this.#winningInputView.render();
    this.#resultOutputView.render();
  }
  #handlePurchaseButton(purchaseMoneyInput) {
    try {
      const purchase = new Purchase(purchaseMoneyInput);
      this.#lottoTicketCount = purchase.getLottoTicketCount();
      const lottoMachine = new LottoMachine(this.#lottoTicketCount);
      this.#lottoTickets = lottoMachine.getLottoTickets();
      this.#lottosOutputView.renderLottos(this.#lottoTickets);
      this.#winningInputView.show();
    } catch (error) {
      alert(error.message);
    }
  }
  #handleResultButton(winningLottoInput, bonusNumberInput) {
    try {
      const lottoManager = new WinningLottoManager(winningLottoInput);
      lottoManager.setBonusNumber(bonusNumberInput);
      const lottoResult = new LottoResult(lottoManager, this.#lottoTickets);
      const { resultData, profitRate } = lottoResult.getResult(this.#lottoTicketCount);
      this.#resultOutputView.renderResult(resultData, profitRate);
    } catch (error) {
      alert(error.message);
    }
  }
  #handleRestartButton() {
    this.#lottoTickets = null;
    this.#lottoTicketCount = null;
    this.run();
  }
}
class WebApp {
  #mainController;
  constructor() {
    this.#mainController = new MainController();
  }
  async run() {
    const app = document.querySelector("#app");
    app.innerHTML = `
      <h2 class="container__title">🎱 내 번호 당첨 확인 🎱</h2>
      <section id="purchase"></section>
      <section class="lottos" id="lottos"></section>
      <section class="winning" id="winning"></section>
      <section class="result" id="result"></section>
    `;
    await this.#mainController.run();
  }
}
const webApp = new WebApp();
await webApp.run();
