import { supabase } from "../config/Supabase";

const createCategory = async (category, desc, userId) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("name", category)
    .single();

  if (!data) {
    const { data: categories, error } = await supabase
      .from("categories")
      .insert({ name: category, description: desc, user_id: userId })
      .single();
    if (error) {
      console.log(error.message);
    }

    return categories;
  }

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getCategory = async (category) => {
  let query = supabase.from("categories").select("*");

  if (category) {
    query = query.eq("name", category);
  }
  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }
  console.log("api", data);
  return data;
};

const getProductCategory = async (categoryId) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateProductCategory = async (value, id) => {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("name", value)
    .single();

  const { data } = await supabase
    .from("products")
    .update({ category_id: categories.id })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export {
  getCategory,
  createCategory,
  getProductCategory,
  updateProductCategory,
};
