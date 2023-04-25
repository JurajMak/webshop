import { supabase } from "../config/Supabase";

const createCategory = async (category, user) => {
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("name", category)
    .single();

  if (!data) {
    const { data: categories, error } = await supabase
      .from("categories")
      .insert({ name: category, user_id: user.id })
      .single();
    if (error) {
      console.log(error.message);
    }
    return categories;
  }

  return data;
};

const getCategory = async () => {
  const { data } = await supabase.from("categories").select("*");

  return data;
};

export { getCategory, createCategory };
