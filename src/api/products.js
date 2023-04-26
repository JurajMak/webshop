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

  const { data, error } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const createProduct = async (values) => {
  const { data, error } = await supabase.from("products").insert(values);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const updateProduct = async (values, productId) => {
  const { data, error } = await supabase
    .from("products")
    .update(values)
    .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const updateSale = async (sale, productId) => {
  const { data, error } = await supabase
    .from("products")
    .update({ is_sale: sale })
    .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const deleteProduct = async (product) => {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", product.id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export { getProducts, createProduct, updateProduct, updateSale, deleteProduct };
