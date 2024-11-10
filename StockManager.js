import { PriorityQueue } from "@datastructures-js/priority-queue";
import { getSpareStockInitValue, sortStocks } from "./utils.js";

class StockManager {
  constructor(M) {
    this.M = 2 * M;
    this.topStocks = new PriorityQueue((a, b) => a.price - b.price);
    this.spareStock = getSpareStockInitValue();
    this.consectiveTopStocksDownCount = 0;
  }

  updateTopStocks(stock) {
    if (this.topStocks.size() < this.M) {
      this.topStocks.enqueue(stock);
      return;
    }
    let popped = getSpareStockInitValue();
    if (!this.topStocks.remove((t) => t.name === stock.name).length) {
      popped = this.topStocks.dequeue();
      this.consectiveTopStocksDownCount = 0;
    } else {
      this.consectiveTopStocksDownCount += 1;
    }
    const tempStockSorted = sortStocks([stock, popped]);
    this.topStocks.enqueue({ ...tempStockSorted[0] });
    return this.consectiveTopStocksDownCount >= Math.floor(this.M / 2);
  }

  getTopStocksValue() {
    return this.topStocks.toArray().slice(Math.floor(this.M / 2)).map((s) => {
      return { name: s.name, price: s.price, perc: s.perc };
    });
  }

  clearStocks() {
    this.topStocks.clear();
    this.consectiveTopStocksDownCount = 0;
  }
}

export default StockManager;
