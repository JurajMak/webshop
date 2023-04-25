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
  Image,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { supabase } from "../../../config/Supabase";
import uploadFile from "../../../utils/uploadFile";
import { Form } from "./Styles";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/Index";
import { createCategory } from "../../../api/categories";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { handleSuccesCreation } from "../../../components/notifications/successNotification";
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
  const [file, setFile] = useState("");
  const [percent, setPercent] = React.useState(0);
  const queryClient = new QueryClient();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
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

  const handleUploadImage = async (file) => {
    const url = await uploadFile({
      file,
      storageName: `uploads/${user.id}`,
    });
    form.setFieldValue("image", url);
  };

  const createCategoryMutation = useMutation({
    mutationFn: (item, id) => createCategory(item, id),
    onSuccess: () => {
      // queryClient.invalidateQueries(["categories", user.id]);
    },
  });

  const handleCreateCategory = async () => {
    await createCategoryMutation.mutateAsync(category, user.id);
  };

  // const handleCreateCategory = async () => {
  //   setLoading(true);
  //   const { data: categories } = await supabase
  //     .from("categories")
  //     .select("*")
  //     .eq("name", category)
  //     .single();

  //   if (!categories) {
  //     const { data, error } = await supabase
  //       .from("categories")
  //       .insert({ name: category, user_id: user.id })
  //       .single();
  //     if (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   setLoading(false);
  // };

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
  };
  const handleNewEntry = () => {
    form.reset();
    setChecked(false);
    setPercent(0);
    setFile("");
  };

  return (
    <div className={classes.wrapper}>
      {/* <Paper className={classes.form} radius={0} p={30}> */}
      <Title order={1} className={classes.title} align="center" pt={50} mb={50}>
        Add new product
      </Title>

      <Form onSubmit={form.onSubmit(handleAddProduct)}>
        <Button
          variant="subtle"
          ml={350}
          // onClick={handleNewEntry}
          onClick={handleSuccesCreation(name)}>
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

        <NumberInput
          value={price}
          precision={2}
          mb={20}
          label="Price"
          {...form.getInputProps("price")}
        />

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
              let calc = (price / 100) * number;
              let total = price - calc;

              form.setFieldValue("sale_price", total.toFixed(2));
              setPercent(number);
            }}
            value={percent}
          />
        )}

        <Group>
          <FileButton
            onChange={(file) => {
              handleUploadImage(file);
              return setFile(file);
            }}
            accept="image/png,image/jpeg,image/jpg">
            {(props) => <Button {...props}>Upload image</Button>}
          </FileButton>
        </Group>

        {file && (
          <Group style={{ flex: 1 }}>
            <Group>
              <Text size="sm" mt="sm">
                Picked file: {file.name}
              </Text>
              <Text size="md">Image preview</Text>
            </Group>
            {image && (
              <Image
                mr="auto"
                ml="auto"
                src={image}
                maw={300}
                alt="Random image"
                width="100%"
              />
            )}
          </Group>
        )}

        <NumberInput
          value={quantity}
          label="Quantity"
          {...form.getInputProps("quantity")}
        />
        <Group mt={20}>
          <Button type="submit" loading={loading} miw={120}>
            Submit
          </Button>
          <Button ml={20} onClick={returnDashboard}>
            Return
          </Button>
        </Group>
      </Form>
      {/* </Paper> */}
    </div>
  );
};

export default Create;
