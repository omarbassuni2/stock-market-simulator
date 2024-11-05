import StockPriceEmulator from "./StockPriceEmulator.js";

// DEMO CODE: create a list of 100 stock
const stocks = new Array(100)
	.fill(null)
	.map((_, index) => new StockPriceEmulator("stock " + index, 100));

// console log everytime you get a new price;
stocks.forEach((stock) => stock.on("tick", console.log));

/**
 * Description:
 * StockPriceEmulator is a class that simulates the price of a stock over time. It extends EventEmitter from the eventemitter3 package, allowing it to emit events when the stock price changes.
 * Assume:
 * M = 20 (The number of top stocks to maintain)
 * X = 1 (The number of seconds changes after each update to a new value in the same range)
 * H = 1 (Switch to a new log file every hour)
 * Objective:
 * 1. Create a list that maintains top M stocks by percentage, with complexity of O(M) where [M] is the number of stocks in the queue.
 * 2. Limit the number of updates that each stock receives to seconds in the range:[X, 4X], the number of seconds changes after each update to a new value in the same range.
 * 3. log updates to a file with the following format, a new file is created every [H] hours.
 *    line: <DD/MM/YYYY HH:MM> <stock name> - <price>
 *    filename: DD/MM/YYYY HH:MM.log
 */
