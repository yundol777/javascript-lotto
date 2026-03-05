import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGE } from "./constants/message.js";

import MainController from "./controllers/MainController.js";
import { RETRY_ANSWER } from "./constants/config.js";

class App {
  #mainController;

  constructor() {
    this.#mainController = new MainController();
  }

  async run() {
    do {
      await this.#mainController.run();
    } while (await this.askRetry());
  }

  async askRetry() {
    const answer = await Console.readLineAsync(INPUT_MESSAGE.RETRY);
    //todo: n말고 다른 게 입력되면 다시 입력받도록 구현
    return answer === RETRY_ANSWER.YES;
  }
}

export default App;
