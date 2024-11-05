import Winston from "./logger.js";
import StockPriceEmulator from "./StockPriceEmulator.js";

class Main {
    constructor() {
        // DEMO CODE: create a list of 100 stock
        const H = 1
        const winston = new Winston(H)
        const stocks = new Array(100)
            .fill(null)
            .map((_, index) => new StockPriceEmulator("stock " + index, 100));

        // console log everytime you get a new price;
        stocks.forEach((stock) => stock.on("tick", (m) => winston.logUpdate(JSON.stringify(m)) ));
    }
}

new Main();