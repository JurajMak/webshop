export const QUERIES = {
  PRODUCT: (id) => ["product", id],
  PRODUCTS: (sortKey, searchValue, page, categoryId, price) => [
    "products",
    sortKey,
    searchValue,
    page,
    categoryId,
    price,
  ],
  CATEGORY: (id) => ["category", id],
  CATEGORIES:(name)=> ["categories",name],
};
