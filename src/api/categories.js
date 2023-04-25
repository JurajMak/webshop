import { supabase } from "../config/Supabase";

const createCategory = async (category, id) => {
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("name", category)
    .single();

  if (!data) {
    const { data: categories, error } = await supabase
      .from("categories")
      .insert({ name: category, user_id: id })
      .single();
    if (error) {
      console.log(error.message);
    }
    console.log(id);
    return categories;
  }
  console.log(data);
  return data;
};

const getCategory = async () => {
  const { data } = await supabase.from("categories").select("*");

  return data;
};

export { getCategory, createCategory };
