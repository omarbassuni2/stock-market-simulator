export function testGetAllStocksValuesSorted(stocksArr) {
  return stocksArr
    .map((s) => {
      return { name: s.name, price: s.price, perc: s.perc };
    })
    .sort((a, b) => b.price - a.price);
}

export function testIsTopStocksEqualToAllStocksSorted(
  allStocksSortedArr,
  topStocksArr,
  M
) {
  allStocksSortedArr = allStocksSortedArr.slice(0, M).reverse();
  return allStocksSortedArr.every(
    (_, i) =>
      allStocksSortedArr[i].name === topStocksArr[i].name &&
      allStocksSortedArr[i].price === topStocksArr[i].price
  );
}

export function seedData1() {
  return {
    "stock 7": { price: "102.55", perc: "2.55" },
    "stock 5": { price: "95.83", perc: "-4.17" },
    "stock 2": { price: "90.48", perc: "-9.52" },
    "stock 1": { price: "104.71", perc: "4.71" },
    "stock 3": { price: "104.03", perc: "4.03" },
    "stock 6": { price: "103.44", perc: "3.44" },
    "stock 8": { price: "99.91", perc: "-0.09" },
    "stock 4": { price: "99.13", perc: "-0.87" },
    "stock 9": { price: "97.79", perc: "-2.21" },
    "stock 0": { price: "95.66", perc: "-4.34" },
  };
}

export function seedData2() {
  return {
    "stock 9": { price: "103.13", perc: "3.13" },
    "stock 7": { price: "105.37", perc: "5.37" },
    "stock 1": { price: "109.34", perc: "9.34" },
    "stock 5": { price: "95.64", perc: "-4.36" },
    "stock 2": { price: "86.62", perc: "-13.38" },
    "stock 8": { price: "96.59", perc: "-3.41" },
    "stock 0": { price: "92.70", perc: "-7.30" },
    "stock 3": { price: "102.43", perc: "2.43" },
    "stock 4": { price: "94.73", perc: "-5.27" },
    "stock 6": { price: "103.45", perc: "-4.62" },
  };
}

export function testGetLogsDir() {
  return "./logs/tests-generated";
}
