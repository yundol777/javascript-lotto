import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "../views/InputView.js";
import Purchase from "../models/Purchase.js";
import LottoMachine from "../services/LottoMachine.js";
import OutputView from "../views/OutputView.js";
import WinningLotto from "../models/WinningLotto.js";
import { INPUT_MESSAGE } from "../constants/message.js";

class MainController {
  async run() {
    //1. 구입 금액 입력 받기
    const purchaseInput = await InputView.readStringWithMsg(
      INPUT_MESSAGE.PURCHASE,
    );

    //1-1. 구매 인스턴스 생성
    const purchase = new Purchase(purchaseInput);
    const lottoCount = purchase.getLottoCount();

    //1-2. 로또 머신 인스턴스 생성
    const lottoMachine = new LottoMachine(lottoCount);
    const lottoBundle = lottoMachine.getLottos();

    //2. 구매 갯수 출력 및 구매 로또 출력
    OutputView.printPurchasedLottos(lottoCount, lottoBundle);

    //3. 당첨 번호 입력 받기
    const winningLotto = new WinningLotto();

    const winningLottosInput = await InputView.readStringWithMsg(
      INPUT_MESSAGE.WINNING_NUMBERS,
    );
    //당첨 번호 검증 및 설정
    winningLotto.setWinningNumbers(winningLottosInput);

    //4. 보너스 번호 입력 받기
    const bonusNumberInput = await InputView.readStringWithMsg(
      INPUT_MESSAGE.BONUS_NUMBER,
    );
    //보너스 번호 검증 및 설정
    lottoResult.setBonusNumber(bonusNumberInput);

    //5. 당첨 통계 출력 (당첨 계산)

    //6. 수익률 출력
  }
}

export default MainController;
