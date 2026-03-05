import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "../views/InputView.js";
import Purchase from "../models/Purchase.js";
import LottoMachine from "../services/LottoMachine.js";
import OutputView from "../views/OutputView.js";
import LottoResult from "../models/LottoResult.js";

class MainController {
  async run() {
    //1. 구입 금액 입력 받기
    const purchaseInput =
      await InputView.readStringWithMsg("> 구입금액을 입력해 주세요.");

    //1-1. 구매 인스턴스 생성
    const purchase = new Purchase(purchaseInput);
    const lottoCount = purchase.getLottoCount();

    //1-2. 로또 머신 인스턴스 생성
    const lottoMachine = new LottoMachine(lottoCount);
    const lottoBundle = lottoMachine.getLottos();

    //2. 구매 갯수 출력 및 구매 로또 출력
    OutputView.printPurchasedLottos(lottoCount, lottoBundle);

    //3. 당첨 번호 입력 받기
    const lottoResult = new LottoResult();

    const winningLottosInput =
      await InputView.readStringWithMsg("> 당첨 번호를 입력해 주세요. ");
    //당첨 번호 검증 및 설정
    lottoResult.setWinningNumbers(winningLottosInput);

    //4. 보너스 번호 입력 받기
    const bonusNumberInput = await InputView.readStringWithMsg(
      "> 보너스 번호를 입력해 주세요. ",
    );
    //보너스 번호 검증 및 설정
    lottoResult.setBonusNumber(bonusNumberInput);

    //5. 당첨 통계 출력 (당첨 계산)

    //6. 수익률 출력
  }
}

export default MainController;

/*
> 구입금액을 입력해 주세요.8000
8개를 구매했습니다.
[8, 21, 23, 41, 42, 43] 
[3, 5, 11, 16, 32, 38] 
[7, 11, 16, 35, 36, 44] 
[1, 8, 11, 31, 41, 42] 
[13, 14, 16, 38, 42, 45] 
[7, 11, 30, 40, 42, 43] 
[2, 13, 22, 32, 38, 45] 
[1, 3, 5, 14, 22, 45]

> 당첨 번호를 입력해 주세요. 1,2,3,4,5,6

> 보너스 번호를 입력해 주세요. 7

당첨 통계
--------------------
3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 0개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개
총 수익률은 62.5%입니다.

> 다시 시작하시겠습니까? (y/n) */
