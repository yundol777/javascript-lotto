import MainController from "./controllers/MainController.js";

class App {
  async run() {
    try {
      const mainController = new MainController();
      await mainController.run();
    } catch (error) {
      console.log(error);
    }
  }
}

export default App;
