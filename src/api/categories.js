import { supabase } from "../config/Supabase";

const getCategory = async () => {
  const { data, error } = await supabase.from("categories").select("*");

  return data;
};

export { getCategory };
