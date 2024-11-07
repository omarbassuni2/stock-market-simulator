import getLogger from "./logger.js";
import StockPriceEmulator from "./StockPriceEmulator.js";
import { PriorityQueue } from "@datastructures-js/priority-queue";
class StockStore {
  constructor(M, X) {
    (this.M = M), (this.X = X);
    this.stockChangeCount = 1;
    this.l = getLogger();
    this.timeoutTimer = undefined;
    this.stocks = new Array(100)
      .fill(null)
      .map((_, index) => new StockPriceEmulator("stock " + index, 100));
    this.topStocks = new PriorityQueue((a, b) => {
      if (a.price > b.price) return 1;
      if (a.price < b.price) return -1;
      return 0;
    });
    this.spareStock = { name: "s", price: -10000 };
  }

  updateTopStocks(stock) {
    if (stock.name === this.spareStock.name) {
      this.spareStock = { ...stock };
    }
    if (this.topStocks.size() < this.M) {
      this.topStocks.enqueue(stock);
      return;
    }
    if (this.topStocks.remove((t) => t.name === stock.name).length) {
      if (stock.price < this.spareStock.price) {
        this.topStocks.enqueue({ ...this.spareStock });
        this.spareStock = stock;
        return;
      }
      this.topStocks.enqueue(stock);
      return;
    }
    if (
      this.spareStock.price > this.topStocks.front().price ||
      stock.price > this.topStocks.front().price
    ) {
      const popped = this.topStocks.dequeue();
      const tempArr = [popped, this.spareStock, stock].sort(
        (a, b) => b.price - a.price
      );
      this.topStocks.enqueue({ ...tempArr[0] });
      this.spareStock = { ...tempArr[1] };
      return;
    }
    const temp = this.spareStock.price > stock.price ? this.spareStock : stock;
    this.spareStock = { ...temp };
  }
  listenWithLimit() {
    const t =
      Math.floor(Math.random() * (4 * this.X - this.X + 1) + this.X) * 1000;
    const log = "Will receive new stock changes: " + this.stockChangeCount++;
    this.timeoutTimer = setTimeout(() => {
      console.log(new Date(), log);
      this.l.logUpdate(log);
      const promises = this.stocks.map((stock) => {
        return new Promise((res) => {
          stock.once("tick", (s) => {
            this.l.logUpdate(JSON.stringify(s));
            s["price"] = Number(s["price"]);
            this.updateTopStocks(s);
            res();
          });
        });
      });
      Promise.all(promises).then(() => {
        this.listenWithLimit(this.X);
        this.l.logUpdate(
          "Top Stocks: \n" +
            this.topStocks
              .toArray()
              .map((e) => `name: ${e.name} - price: ${e.price}`)
              .join("\n")
        );
      });
    }, t);
  }
  start() {
    if (this.timeoutTimer) return;
    console.log("Starting to listen with limit!");
    this.listenWithLimit();
  }
  stop() {
    if (!this.timeoutTimer) return;
    console.log("Stopping listening with limit!");
    clearTimeout(this.timeoutTimer);
  }
}

export default StockStore;
