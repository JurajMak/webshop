import {
  Paper,
  createStyles,
  TextInput,
  Title,
  Checkbox,
  Loader,
  Button,
  Text,
  Group,
  FileButton,
  NumberInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { supabase } from "../../../config/Supabase";

import { Form } from "./Styles";
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
  const [file, setFile] = useState([]);
  const [filepath, setFilePath] = useState("");
  const [percent, setPercent] = React.useState(0);

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
      sale_price: "",
      image: "",
    },
  });
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const { name, description, price, quantity, category, sale_price, image } =
    form.values;

  const returnDashboard = async () => {
    navigate("/admin");
  };
  const getImage = (filePath) => {
    const { data, error } = supabase.storage
      .from("avatars")
      .getPublicUrl(filepath);

    console.log(data);
    form.setFieldValue("image", data.publicUrl + filePath);
  };

  const handleImageAdd = async (file) => {
    const filename = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data);
    data && getImage(data.path);
  };

  const handleCreateCategory = async () => {
    setLoading(true);
    const { data: categories } = await supabase
      .from("categories")
      .select("*")
      .eq("name", category)
      .single();

    if (!categories) {
      const { data, error } = await supabase
        .from("categories")
        .insert({ name: category, user_id: user.id });
      if (error) {
        console.log(error.message);
      }
    }
    setLoading(false);
  };
  const handleAddProduct = async () => {
    setLoading(true);

    const { data: categories } = await supabase
      .from("categories")
      .select("*")
      .eq("name", category)
      .single();

    const { data, error } = await supabase.from("products").insert({
      name,
      description,
      price,
      quantity,
      category_id: categories.id,
      is_sale: checked,
      sale_price: checked ? sale_price : null,
      user_id: user.id,
      image,
    });

    setLoading(false);
    // form.reset();
  };
  console.log(form.values);
  return (
    <div className={classes.wrapper}>
      {/* <Paper className={classes.form} radius={0} p={30}> */}
      <Title order={1} className={classes.title} align="center" pt={50} mb={50}>
        Add new product
      </Title>

      <Form onSubmit={form.onSubmit(handleAddProduct)}>
        <Button variant="subtle" ml={350} onClick={() => form.reset()}>
          New Entry
        </Button>
        <TextInput label="Category" {...form.getInputProps("category")} />
        <Button mt={10} mb={10} onClick={handleCreateCategory}>
          Add or Set Category
        </Button>
        <TextInput
          mb={10}
          label="Product name"
          {...form.getInputProps("name")}
        />
        <TextInput
          mb={10}
          label="Description of product"
          {...form.getInputProps("description")}
        />

        <NumberInput mb={20} label="Price" {...form.getInputProps("price")} />

        <Checkbox
          m="auto"
          mb={10}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (!e.target.checked) {
              form.setFieldValue("salePercentage", "");
            }
          }}
          label="Set item on Sale"
        />
        {checked && (
          <NumberInput
            mb={10}
            label={`Set sale %`}
            onChange={(number) => {
              let calc = Math.floor((price / 100) * number);
              let total = price - calc;

              form.setFieldValue("sale_price", total);
              setPercent(number);
            }}
            value={percent}
          />
        )}

        <Group>
          <FileButton
            onChange={(file) => {
              handleImageAdd(file);
              return setFile(file);
            }}
            accept="image/png,image/jpeg,image/jpg"
          >
            {(props) => <Button {...props}>Upload image</Button>}
          </FileButton>
        </Group>

        {file && (
          <Text size="sm" mt="sm">
            Picked file: {file.name}
          </Text>
        )}

        <NumberInput label="Quantity" {...form.getInputProps("quantity")} />

        <Button type="submit">{loading ? <Loader /> : "Submit"}</Button>
        <Button mt={20} ml={30} onClick={returnDashboard}>
          Return
        </Button>
      </Form>
      {/* </Paper> */}
    </div>
  );
};

export default Create;
