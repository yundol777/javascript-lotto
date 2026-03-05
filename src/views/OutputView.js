import { Console } from "@woowacourse/mission-utils";
// import { OUTPUT_MESSAGE } from "../constants/messages.js";
// import { LOTTO_NUMBER_SEPARATOR } from "../constants/config.js";
// import { formatNumber } from "../utils/Utils.js";
const OutputView = {
  printPurchasedLottos(lottoCount, lottoNumberArrays) {
    Console.print(`${lottoCount}개를 구매했습니다.`);

    lottoNumberArrays.forEach((numbers) => {
      Console.print(`[${numbers.join(`, `)}]`);
    });
  },

  // printResult(resultData, profitRate) {
  //   Console.print(OUTPUT_MESSAGE.WINNING_STATISTICS_HEADER);

  //   this.printWinningInfo(resultData);

  //   const formattedProfitRate = formatNumber(profitRate);

  //   Console.print(OUTPUT_MESSAGE.PROFIT_RATE(formattedProfitRate));
  // },
  // printWinningInfo(resultData) {
  //   resultData.forEach((rank) => {
  //     const { matchCount, money, requireBonus, count } = rank;

  //     let matchMessage = OUTPUT_MESSAGE.WINNING_MATCH_COUNT_INFO(matchCount);
  //     if (requireBonus) matchMessage += ", 보너스 볼 일치";

  //     const formattedMoney = formatNumber(money);
  //     const prizeMessage = OUTPUT_MESSAGE.WINNING_PRIZE_MONEY(formattedMoney);

  //     Console.print(`${matchMessage} ${prizeMessage} - ${count}개`);
  //   });
  // },

  // printMessage(message) {
  //   Console.print(message);
  // },
};

export default OutputView;
