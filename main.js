import Winston from "./logger.js";
import StockPriceEmulator from "./StockPriceEmulator.js";

class Main {
    constructor() {
        // DEMO CODE: create a list of 100 stock
        const M = 20, X = 1, H = 1
        this.winston = new Winston(H)
        this.stocks = new Array(100)
            .fill(null)
            .map((_, index) => new StockPriceEmulator("stock " + index, 100));
        this.listenWithLimit(X)
    }
    listenWithLimit(x) {
        const t = Math.floor(Math.random() * (4 * x - x + 1) + x) * 1000;
        new Promise((resolve) => {
            setTimeout(() => {
                this.stocks.forEach((stock) => stock.once("tick", (m) => this.winston.logUpdate(JSON.stringify(m)) ));
                resolve();
            }, t);
        }).then(() => this.listenWithLimit(x));
    }
}

new Main();