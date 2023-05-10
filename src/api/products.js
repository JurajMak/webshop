import { supabase } from "../config/Supabase";

const getProducts = async (sortKey, searchValue, page, categoryId, price) => {
  let query = supabase.from("products").select("*");

  if (sortKey === "lowest") {
    // TODO fix rpc function to sort prices asc order
    // query = query.rpc("get_prices_asc");
    query = query.order("price", { ascending: true });
  }

  if (sortKey === "highest") {
    // TODO fix rpc function to sort prices asc order
    // query = query.rpc("get_prices_desc");
    query = query.order("price", { ascending: false });
  }
  if (sortKey === "sale") {
    query = query.eq("is_sale", true);
  }
  if (sortKey === "popular") {
    query = query.order("updated_at", { ascending: true });
  }

  if (searchValue) {
    query = query.or(
      `name.ilike.%${searchValue}%,description.ilike.%${searchValue}%`
    );
  }
  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }
  if (price) {
    if (price == 50) {
      query = query.gte("price", 0).lte("price", 50);
    }
    if (price == 100) {
      query = query.gte("price", 50).lte("price", 100);
    }
    if (price == 200) {
      query = query.gte("price", 100).lte("price", 200);
    }
    if (price == 300) {
      query = query.gte("price", 200).lte("price", 500);
    }
    if (price == 500) {
      query = query.gte("price", 500);
    }
  }

  const from = page === 1 ? 0 : 20 * (page - 1);
  const to = page * 20 - 1;

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

const getProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export {
  getProducts,
  createProduct,
  updateProduct,
  updateSale,
  deleteProduct,
  getProductById,
};

// const handleCategoryEnter = async (e) => {
//   if (e.key === "Enter") {
//     const { data: categories } = await supabase
//       .from("categories")
//       .select("id")
//       .ilike("name", `%${value}%`);

//     const categoryIds = categories.map((category) => category.id);

//     const { data: productData } = await supabase
//       .from("products")
//       .select("*")
//       .in("category_id", categoryIds);

//     setSearch(productData);
//   }
// };

// const getProductByCategory = async (searchValue) => {
//   const { data: categories } = await supabase
//     .from("categories")
//     .select("id")
//     .ilike("name", `%${searchValue}%`);

//   const categoryIds = categories.map((category) => category.id);

//   const { data } = await supabase
//     .from("products")
//     .select("*")
//     .in("category_id", categoryIds);

//   return data;
// };
