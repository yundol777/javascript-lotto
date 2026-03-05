class LottoResult {
  #lottoResult;

  constructor(winningLotto, lottoBundle) {
    this.#calculateResult(winningLotto, lottoBundle);
  }

  #calculateResult(winningLotto, lottoBundle) {
    this.#lottoResult = lottoBundle.map((lotto) => {
      return winningLotto.compareWithWinningLotto(lotto);
    });
  }

  getResult() {
    return this.#lottoResult;
  }
}

export default LottoResult;
