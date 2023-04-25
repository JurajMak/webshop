import { supabase } from "../config/Supabase";

const createCategory = async (category, desc, userId) => {
  const { data } = await supabase
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

  return data;
};

const getCategory = async (category) => {
  let query = supabase.from("categories").select("*");

  if (category) {
    query = query.eq("name", category);
  }
  const { data } = await query;

  return data;
};

export { getCategory, createCategory };
