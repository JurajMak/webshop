import {
  Paper,
  createStyles,
  TextInput,
  Title,
  Checkbox,
  Loader,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { supabase } from "../../../config/Supabase";

import { Form, StyledButton } from "./Styles";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/Index";
const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const Create = () => {
  const { classes } = useStyles();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    salePercentage: "",
  });
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const { name, description, price, quantity, category, salePercentage } =
    form.values;
  let calc = Math.round((price / 100) * salePercentage);
  let total = price - calc;
  const returnDashboard = async () => {
    navigate("/admin");
  };

  const handleAddProduct = async () => {
    setLoading(true);
    const { data: categories } = await supabase
      .from("categories")
      .select("*")
      .eq("name", category)
      .single();

    let categoryId;

    if (!categories) {
      const { data: addCategory } = await supabase
        .from("categories")
        .insert({ name: category, user_id: user.id });

      categoryId = addCategory.id;
    } else {
      categoryId = categories.id;
    }

    const { data, error } = await supabase.from("products").insert({
      name,
      description,
      price,
      quantity,
      category_id: categoryId,
      is_sale: checked,
      sale_price: total,
      user_id: user.id,
    });

    setLoading(false);
    form.reset();
  };

  console.log(checked);
  return (
    <div className={classes.wrapper}>
      {/* <Paper className={classes.form} radius={0} p={30}> */}
      <Title order={1} className={classes.title} align="center" pt={50} mb={50}>
        Add new product
      </Title>

      <Form onSubmit={form.onSubmit(handleAddProduct)}>
        <TextInput label="Category" {...form.getInputProps("category")} />
        <StyledButton onClick={(e) => console.log("bla")}>
          Add Category
        </StyledButton>
        <TextInput label="Product name" {...form.getInputProps("name")} />
        <TextInput
          label="Description of product"
          {...form.getInputProps("description")}
        />

        <TextInput label="Price" {...form.getInputProps("price")} />

        <Checkbox
          m="auto"
          mt={10}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label="Set item on Sale"
        />
        {checked && (
          <TextInput
            label={`Set sale %`}
            {...form.getInputProps("salePercentage")}
          />
        )}

        <TextInput label="Quantity" {...form.getInputProps("quantity")} />

        <StyledButton type="submit">
          {loading ? <Loader /> : "Submit"}
        </StyledButton>
        <StyledButton onClick={returnDashboard}>Return</StyledButton>
      </Form>
      {/* </Paper> */}
    </div>
  );
};

export default Create;
