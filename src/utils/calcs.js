export const salePriceEdit = (price, sale_price, percent, state) => {
  const prevPercentageCalc = price - (percent / 100) * price;
  if (price === null && sale_price === null) {
    return state.sale_price;
  } else if (sale_price === null) {
    return prevPercentageCalc.toFixed(2);
  } else {
    return sale_price;
  }
};

export const percentageCalc = (price, sale_price) => {
  return Math.round(((price - sale_price) / price) * 100);
};

export const salePriceCalc = (price, number) => {
  let calc = ((price / 100) * number).toFixed(2);
  let total = (price - calc).toFixed(2);
  return total;
};

export const editSalePriceCalc = (price, state, number) => {
  const checkValue = price ?? state.price;
  const calc = ((checkValue * number) / 100).toFixed(2);
  const total = (checkValue - calc).toFixed(2);
  return total;
};
