export function getSpareStockInitValue() {
  return { name: "spareStock", price: -10000, perc: 0 };
}

export function getSortedStocksDeepCopy(stock, spare, dequeued) {
  return [{ ...stock }, { ...spare }, { ...dequeued }].sort(
    (a, b) => b.price - a.price
  );
}
