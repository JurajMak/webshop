// const handleAddProduct = async () => {
//   setLoading(true);
//   const { data: categories } = await supabase
//     .from("categories")
//     .select("*")
//     .eq("name", category)
//     .single();

//   let categoryId;

//   if (!categories) {
//     const { data: addCategory } = await supabase
//       .from("categories")
//       .insert({ name: category, user_id: user.id });

//     categoryId = addCategory.id;
//   } else {
//     categoryId = categories.id;
//   }

//   const { data, error } = await supabase.from("products").insert({
//     name,
//     description,
//     price,
//     quantity,
//     category_id: categoryId,
//     is_sale: checked,
//     sale_price: total,
//     user_id: user.id,
//   });

//   setLoading(false);
// };

// logic for adding category and product in same time not working as intended
