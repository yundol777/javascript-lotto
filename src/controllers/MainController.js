import { MissionUtils } from "@woowacourse/mission-utils";

class MainController {
  async run() {
    do {
      await this.executeOnce();
    } while (await this.askRetry());
  }

  async askRetry() {
    const answer = await MissionUtils.Console.readLineAsync(
      "> 다시 시작하시겠습니까? (y/n) \n",
    );
    return answer.toLowerCase() === "y";
  }

  async executeOnce() {
    //1. 구입 금액 입력 받기
    //2. 구매 갯수 출력
    //3. 구매 로또 추력
    //4. 당첨 번호 입력 받기
    //5. 보너스 번호 입력 받기
    //6. 당첨 통계 출력
    //7. 수익률 출력
  }
}

export default MainController;
