import StockPriceEmulator from "./StockPriceEmulator.js";
import StockManager from "./StockManager.js";
import StockListener from "./StockListener.js";

class StockStore {
  constructor(M, X) {
    this.M = M;
    this.X = X;

    // Create StockPriceEmulator instances
    this.stocks = new Array(100)
      .fill(null)
      .map((_, index) => new StockPriceEmulator("stock " + index, 100));

    // Initialize StockManager and StockListener
    this.stockManager = new StockManager(this.M);
    this.listener = new StockListener(this.stocks, this.stockManager, this.X);
  }

  start() {
    this.listener.startListening();
  }

  stop() {
    this.listener.stopListening();
  }
}

export default StockStore;
