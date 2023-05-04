const sumPrice = (item) => {
  return item
    .reduce((acc, cart) => {
      const total = cart.is_sale ? cart.sale_price : cart.price;
      return cart.quantity * total + acc;
    }, 0)
    .toFixed(2);
};

export { sumPrice };
