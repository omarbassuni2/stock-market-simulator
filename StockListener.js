import getLogger from "./Logger.js";

class StockListener {
  constructor(stocks, stockManager, X) {
    this.X = X;
    this.stockChangeCount = 1;
    this.logger = getLogger();
    this.timeoutTimer = undefined;
    this.stocks = stocks;
    this.stockManager = stockManager;
  }

  listenWithLimit() {
    const t =
      Math.floor(Math.random() * (4 * this.X - this.X + 1) + this.X) * 1000;
    const log = "Will receive new stock changes: " + this.stockChangeCount++;
    this.timeoutTimer = setTimeout(() => {
      console.log(new Date(), log);
      this.logger.logUpdate(log);

      const promises = this.stocks.map((stock) => {
        return new Promise((res) => {
          stock.once("tick", (s) => {
            this.logger.logUpdate(JSON.stringify(s));
            s["price"] = Number(s["price"]);
            this.stockManager.updateTopStocks(s);
            res();
          });
        });
      });

      Promise.all(promises).then(() => {
        this.listenWithLimit();
        this.logger.logUpdate(
          "Top Stocks: \n" +
            this.stockManager
              .getTopStocksValue()
              .map((e) => `name: ${e.name} - price: ${e.price}`)
              .join("\n")
        );
      });
    }, t);
  }

  startListening() {
    if (this.timeoutTimer) return;
    console.log("Starting to listen with limit!");
    this.listenWithLimit();
  }

  stopListening() {
    if (!this.timeoutTimer) return;
    console.log("Stopping listening with limit!");
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = undefined;
  }
}

export default StockListener;
