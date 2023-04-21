import { supabase } from "../config/Supabase";

const getProducts = async (sortKey, searchValue, page) => {
  let query = supabase.from("products").select("*");

  if (sortKey === "lowest") {
    query = query.order([
      { column: "sale_price", ascending: true },
      { column: "price", ascending: true },
    ]);
  }
  if (sortKey === "highest") {
    query = query.order([
      { column: "sale_price", ascending: false },
      { column: "price", ascending: false },
    ]);
  }

  if (searchValue) {
    query = query.or(
      `name.ilike.%${searchValue}%,categories.cs.{${searchValue}}`
    );
  }

  const from = page === 1 ? 0 : 8 * (page - 1);
  const to = page * 8 - 1;

  const { data } = await query.range(from, to);

  return data;
};

export { getProducts };
