import getLogger from "./Logger.js";
import StockStore from "./StockStore.js";

class Main {
  constructor(M, X, H) {
    getLogger(H);
    this.stockStore = new StockStore(M, X);
    console.log("File logger and Stock Store were initialized!");
    this.stockStore.start();
  }
}

new Main(20, 1, 1);
