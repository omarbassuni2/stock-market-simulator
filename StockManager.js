import { PriorityQueue } from "@datastructures-js/priority-queue";
import { getSpareStockInitValue, sortStocks } from "./utils.js";

class StockManager {
  constructor(M) {
    this.M = M;
    this.topStocks = new PriorityQueue((a, b) => a.price - b.price);
    this.spareStock = getSpareStockInitValue();
  }

  updateTopStocks(stock) {
    if (stock.name === this.spareStock.name) {
      this.spareStock = getSpareStockInitValue();
    }
    if (this.topStocks.size() < this.M) {
      this.topStocks.enqueue(stock);
      return;
    }
    let popped = getSpareStockInitValue();
    if (!this.topStocks.remove((t) => t.name === stock.name).length) {
      popped = this.topStocks.dequeue();
    }
    const tempStockSorted = sortStocks([stock, this.spareStock, popped]);
    this.topStocks.enqueue({ ...tempStockSorted[0] });
    this.spareStock = { ...tempStockSorted[1] };
  }

  getTopStocksValue() {
    return this.topStocks.toArray().map((s) => {
      return { name: s.name, price: s.price, perc: s.perc };
    });
  }
}

export default StockManager;
