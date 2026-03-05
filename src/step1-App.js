import { Console } from "@woowacourse/mission-utils";
import MainController from "./controllers/MainController.js";

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
    const answer = await Console.readLineAsync(
      "> 다시 시작하시겠습니까? (y/n) ",
    );
    return answer.toLowerCase() === "y";
  }
}

export default App;
