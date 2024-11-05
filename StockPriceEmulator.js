import EventEmitter from "eventemitter3";

class StockPriceEmulator extends EventEmitter {
	constructor(name, startingPrice) {
		super();
		this.name = name;
		this.price = startingPrice;
		this.startingPrice = startingPrice;
		this.changePercentage = 0;
		this.generateRandomPrice(); // Call immediately
	}

	generateRandomPrice() {
		// Simulate a random price change
		const priceChange = (Math.random() - 0.5) * 5; // Random change between -2.5 and 2.5
		this.price += priceChange;

		// Calculate the change percentage since the starting price
		this.changePercentage =
			((this.price - this.startingPrice) / this.startingPrice) * 100;

		// Emit the updated price and change percentage
		this.emit("tick", {
			name: this.name,
			price: this.price.toFixed(2), // Limit to 2 decimal places
			perc: this.changePercentage.toFixed(2),
		});

		// Calculate a random interval between 2 and 20 ticks per second (200-50 ms)
		const randomInterval = Math.random() * (200 - 100) + 50;

		// Set a timeout for the next price update
		this.timeout = setTimeout(
			this.generateRandomPrice.bind(this),
			randomInterval
		);
	}

	stop() {
		clearTimeout(this.timeout);
	}
}

export default StockPriceEmulator;
