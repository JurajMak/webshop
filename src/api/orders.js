import { supabase } from "../config/Supabase";

const getOrders = async () => {
  const { data, error } = await supabase.from("orders").select(
    `
        *,
        order_products(
          product_id,
          products:products(name),
          user_id,
          profiles:profiles(full_name),
          order_id,
          orders:orders(total)
        )
      `
  );

  if (error) {
    throw new Error(error.message);
  }

  return data.flatMap((order) => ({
    id: order.id,
    profile_name: order?.order_products[0]?.profiles?.full_name,
    total: order.total,
  }));
};

export { getOrders };
