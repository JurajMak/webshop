import { supabase } from "../config/Supabase";

const getProducts = async (sortKey, searchValue, page) => {
  let query = supabase.from("products").select("*");

  if (sortKey === "lowest") {
    query = query
      .order("sale_price", { ascending: true })
      .order("price", { ascending: true });
  }
  if (sortKey === "highest") {
    query = query
      .order("sale_price", { ascending: false })
      .order("price", { ascending: false });
  }
  if (sortKey === "sale") {
    query = query.not("sale_price", "is", null).eq("is_sale", true);
  }

  if (searchValue) {
    query = query.or(
      `name.ilike.%${searchValue}%,description.ilike.%${searchValue}%`
    );
  }

  const from = page === 1 ? 0 : 10 * (page - 1);
  const to = page * 10 - 1;

  const { data } = await query.range(from, to);

  return data;
};

const createProduct = async () => {};

export { getProducts };
