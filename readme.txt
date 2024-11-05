/**
 * Description:
 * StockPriceEmulator is a class that simulates the price of a stock over time. It extends EventEmitter from the eventemitter3 package, allowing it to emit events when the stock price changes.
 * Assume:
 * M = 20
 * X = 1
 * H = 1
 * Objective:
 * 1. Create a queue that maintains top M stocks by percentage, with complexity of O(M) where [M] is the number of stocks in the queue.
 * 2. Limit the number of updates that each stock receives to seconds in the range:[X, 4X], the number of seconds changes after each update to a new value in the same range.
 * 3. log updates to a file with the following format, a new file is created every [H] hours.
 *    line: <DD/MM/YYYY HH:MM> <stock name> - <price>
 *    filename: DD/MM/YYYY HH:MM.log
 */
