import StockManager from "../StockManager.js";
import StockPriceEmulator from "../StockPriceEmulator.js";
import {
  seedData1,
  seedData2,
  testGetAllStocksValuesSorted,
  testIsTopStocksEqualToAllStocksSorted,
} from "./TestUtils.js";

describe("StockManager", () => {
  const M = 3;
  let stocks = new Array(10).fill(null).map((_, index) => {
    const s = new StockPriceEmulator("stock " + index, 100);
    s.stop();
    return s;
  });
  let manager = new StockManager(M);
  it("When sending more than (M) stocks , top stocks size should be M", () => {
    stocks.forEach((s) => manager.updateTopStocks(s));
    expect(manager.getTopStocksValue().length).toBe(M);
  });
  it("When limiting each stock to one update, the top stock should be sorted", () => {
    const sortedStocks = testGetAllStocksValuesSorted(stocks);
    const topStocksArr = manager.getTopStocksValue();
    const isTopStocksCorrect = testIsTopStocksEqualToAllStocksSorted(
      sortedStocks,
      topStocksArr,
      M
    );
    expect(isTopStocksCorrect).toBe(true);
  });
  it("When top stocks has a stock and that stock price was went up, top stocks should update its price and be sorted", () => {
    const sortedStocks = testGetAllStocksValuesSorted(stocks)
      .slice(0, M)
      .reverse();
    const stockToBeChanged = stocks.find(
      (s) => s.name === sortedStocks[0].name
    );
    stockToBeChanged.price += 1;
    manager.updateTopStocks(stockToBeChanged);
    const isTopStocksCorrect = testIsTopStocksEqualToAllStocksSorted(
      testGetAllStocksValuesSorted(stocks),
      manager.getTopStocksValue(),
      M
    );
    expect(isTopStocksCorrect).toBe(true);
  });
  it("When top stocks has a stock and that stock price was lowered -a lot that it needs to replaced-, top stocks should replace it and be sorted", () => {
    const sortedStocks = testGetAllStocksValuesSorted(stocks)
      .slice(0, M)
      .reverse();
    const stockToBeChanged = stocks.find(
      (s) => s.name === sortedStocks[0].name
    );
    const priceBeforeChange = stockToBeChanged.price;
    stockToBeChanged.price = 0;
    manager.updateTopStocks(stockToBeChanged);
    const isTopStocksCorrect = testIsTopStocksEqualToAllStocksSorted(
      testGetAllStocksValuesSorted(stocks),
      manager.getTopStocksValue(),
      M
    );
    expect(isTopStocksCorrect).toBe(true);
    stockToBeChanged.price = priceBeforeChange;
    manager.updateTopStocks(stockToBeChanged);
  });
  it("When a stock that is not in top stocks but has higher value than lowest value in top stocks, top stocks should replace it", () => {
    const sortedStocks = testGetAllStocksValuesSorted(stocks);
    const stockToBeChanged = stocks.find(
      (s) => s.name === sortedStocks[sortedStocks.length - 1].name
    );
    const priceBeforeChange = stockToBeChanged.price;
    stockToBeChanged.price += 100;
    manager.updateTopStocks(stockToBeChanged);
    const isTopStocksCorrect = testIsTopStocksEqualToAllStocksSorted(
      testGetAllStocksValuesSorted(stocks),
      manager.getTopStocksValue(),
      M
    );
    expect(isTopStocksCorrect).toBe(true);
    stockToBeChanged.price = priceBeforeChange;
    manager.updateTopStocks(stockToBeChanged);
  });
  it("When we our spareStock received a new price change, the spareStock should be reset", () => {
    stocks = new Array(10).fill(null).map((_, index) => {
      const s = new StockPriceEmulator("stock " + index, 100);
      s.stop();
      return s;
    });
    manager = new StockManager(M);
    const d1 = seedData1(),
      d2 = seedData2();
    Object.keys(d1).forEach((name) => {
      const toBeChanged = stocks.find((s) => s.name === name);
      toBeChanged.price = d1[name].price;
      manager.updateTopStocks(toBeChanged);
    });
    Object.keys(d2).forEach((name) => {
      const toBeChanged = stocks.find((s) => s.name === name);
      toBeChanged.price = d2[name].price;
      manager.updateTopStocks(toBeChanged);
    });
    const isTopStocksCorrect = testIsTopStocksEqualToAllStocksSorted(
      testGetAllStocksValuesSorted(stocks),
      manager.getTopStocksValue(),
      M
    );
    expect(isTopStocksCorrect).toBe(true);
  });
});
