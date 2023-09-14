import { supabase } from "../config/Supabase";

const createShippingInfo = async (values) => {
  const { data, error } = await supabase.from("shipping_info").insert(values);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export { createShippingInfo };
