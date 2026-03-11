import MainController from "./controllers/web/MainController.js";

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
      <section id="lottos"></section>
      <section id="winning"></section>
      <section id="result"></section>
    `;

    await this.#mainController.run();
  }
}

export default WebApp;
