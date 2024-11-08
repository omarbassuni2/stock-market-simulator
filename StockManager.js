import { PriorityQueue } from "@datastructures-js/priority-queue";
import { getSpareStockInitValue } from "./utils.js";

class StockManager {
  constructor(M) {
    this.M = M;
    this.topStocks = new PriorityQueue((a, b) => {
      if (a.price > b.price) return 1;
      if (a.price < b.price) return -1;
      return 0;
    });
    this.spareStock = getSpareStockInitValue();
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

  getTopStocks() {
    return this.topStocks.toArray();
  }
}

export default StockManager;
