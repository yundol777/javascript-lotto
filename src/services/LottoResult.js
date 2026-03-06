import { resultAggregator } from "./ResultAggregator.js";
import { calculateProfitRate } from "./CalculateProfitRate.js";
import { LOTTO_COST } from "../constants/config.js";

class LottoResult {
  #lottoResult;

  constructor(winningLottoManager, lottoBundle) {
    this.#calculateResult(winningLottoManager, lottoBundle);
  }

  #calculateResult(winningLottoManager, lottoBundle) {
    this.#lottoResult = lottoBundle.map((lotto) => {
      return winningLottoManager.compareWithWinningLotto(lotto);
    });
  }

  // 당첨 통계와 수익률을 계산하여 반환 만약 나눈다면... 수익률 계산 함수의 위치가 조금 모호하다고 생각했음
  getResult(lottoCount) {
    // 테스트를 위해 순수 함수로 분리. (matchCount: 6, hasBonus: false) 만으로 테스트 가능하도록
    const resultData = resultAggregator(this.#lottoResult);
    const profitRate = calculateProfitRate(resultData, lottoCount * LOTTO_COST);

    return { resultData, profitRate };
  }
}

export default LottoResult;
