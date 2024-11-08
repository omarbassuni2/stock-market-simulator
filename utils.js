export function getSpareStockInitValue() {
  return { name: "spareStock", price: -10000, perc: 0 };
}

export function sortStocks(stocksArr) {
  return stocksArr.sort((a, b) => b.price - a.price);
}
