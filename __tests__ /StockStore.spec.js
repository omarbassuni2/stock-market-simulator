import StockListener from "../StockListener.js";
import StockManager from "../StockManager.js";
import StockStore from "../StockStore.js";
import { testGetLogsDir } from "./TestUtils.js";
import fs from "fs";
import path from "path";

describe("StockStore", () => {
  it("When testing stock store, should create stock manager and start listening to update and create top stocks", async () => {
    const M = 20,
      X = 0.0001;
    const store = new StockStore(M, X);
    expect(store.stocks.length).toBeGreaterThan(M);
    expect(store.stockManager).toBeInstanceOf(StockManager);
    expect(store.listener).toBeInstanceOf(StockListener);
    expect(store.stockManager.topStocks.size()).toBe(0);
    const logsDir = testGetLogsDir();
    // const listenWithLimitSpy = jest.spyOn(store, "listenWithLimit");
    store.start();
    await new Promise((resolve) => setTimeout(resolve, 100));
    store.stop();
    store.stocks.forEach((s) => s.stop());
    expect(store.stockManager.topStocks.size()).toBe(2 * M);
    expect(fs.readdirSync(logsDir).length).toBeGreaterThan(0);
    store.listener.logger.clearInterval();
    const files = fs.readdirSync(logsDir);
    files.forEach((file) => fs.unlinkSync(path.join(logsDir, file)));
    fs.rmdirSync(logsDir);
  });
});
