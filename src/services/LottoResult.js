import { resultCalculator } from "./ResultCalculator.js";
import { calculateProfitRate } from "./CalculateProfitRate.js";
import { LOTTO_COST } from "../constants/config.js";

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

export default LottoResult;
