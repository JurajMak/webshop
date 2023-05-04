import {
  createStyles,
  TextInput,
  Title,
  Checkbox,
  Button,
  Text,
  Group,
  FileButton,
  NumberInput,
  Image,
  Container,
  Select,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import uploadFile from "../../../utils/uploadFile";
import { Form } from "./Styles";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/Index";
import { getCategory } from "../../../api/categories";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { handleSuccessCreationNotification } from "../../../components/notifications/successNotification";
import { createProduct } from "../../../api/products";

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
  const [value, setValue] = React.useState("");
  const queryClient = new QueryClient();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      sale_price: 0,
      image: "",
    },
  });
  const { name, description, price, quantity, sale_price, image } = form.values;

  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory(value),
  });
  const mappedCategories = data?.map((item) => item.name);

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

  const createProductMutation = useMutation({
    mutationFn: (item) => createProduct(item),
    onSuccess: () => {
      handleSuccessCreationNotification(name);
      queryClient.invalidateQueries("products");
    },
  });

  const handleAddProduct = async () => {
    const createProduct = {
      ...form.values,
      category_id: data[0]?.id,
      is_sale: checked,
      sale_price: checked ? sale_price : null,
      user_id: user.id,
    };
    await createProductMutation.mutateAsync(createProduct);
  };

  const handleNewEntry = () => {
    form.reset();
    setChecked(false);
    setPercent(0);
    setFile("");
    setValue("");
  };

  React.useEffect(() => {
    refetch();
  }, [value]);
  console.log("sale", typeof sale_price, sale_price);
  console.log("price", typeof price, price);
  console.log("percent", typeof percent, percent);
  return (
    <Container sizes="xl" className={classes.wrapper}>
      <Title order={1} className={classes.title} align="center" pt={50} mb={50}>
        Add new product
      </Title>

      <Form onSubmit={form.onSubmit(handleAddProduct)}>
        <Group position="right">
          <Button variant="subtle" color="dark" onClick={handleNewEntry}>
            New Entry
          </Button>
        </Group>

        {!isLoading && (
          <Select
            mb={10}
            label="Categories"
            searchable
            clearable
            placeholder="Assign product to category"
            value={value}
            data={mappedCategories}
            onChange={setValue}
          />
        )}

        <TextInput
          mb={10}
          value={name}
          label="Product name"
          {...form.getInputProps("name")}
        />
        <TextInput
          mb={10}
          value={description}
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
          color="dark"
          mb={10}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            // if (!e.target.checked) {
            //   form.setFieldValue("salePercentage", "");
            // }
          }}
          label="Set item on Sale"
        />
        {checked && (
          <NumberInput
            mb={10}
            label={`Set sale %`}
            onChange={(number) => {
              let calc = ((price / 100) * number).toFixed(2);
              let total = (price - calc).toFixed(2);
              console.log("calc", total);
              form.setFieldValue("sale_price", total);
              setPercent(number);
            }}
            value={percent}
          />
        )}

        <Group mb={10}>
          <FileButton
            color="dark"
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
          <Button color="dark" type="submit" loading={loading} miw={120}>
            Submit
          </Button>
          <Button color="dark" ml={20} onClick={returnDashboard}>
            Return
          </Button>
        </Group>
      </Form>
    </Container>
  );
};

export default Create;
