import {
  createStyles,
  TextInput,
  Title,
  Checkbox,
  Button,
  Image,
  FileButton,
  Text,
  Group,
  NumberInput,
  Select,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import React, { useState, useContext } from "react";
import uploadFile from "../../../utils/uploadFile";
import { Form } from "./Styles";
import { AuthContext } from "../../../contexts/Index";
import {
  getCategory,
  getProductCategory,
  updateProductCategory,
} from "../../../api/categories";
import { handleSuccessUpdateNotification } from "../../../components/notifications/successNotification";
import { updateProduct, updateSale } from "../../../api/products";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    padding: 50,
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

const Edit = () => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: null,
      quantity: "",
      sale_price: null,
      image: "",
    },
  });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name, description, price, quantity, sale_price, image } = form.values;
  const [isSale, setSale] = useState(state.is_sale);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const queryClient = new QueryClient();
  const percentageCalc = Math.floor(
    ((state.price - state.sale_price) / state.price) * 100
  );
  const [percent, setPercent] = React.useState(
    state.is_sale ? percentageCalc : null
  );
  const prevPercentageCalc = price - (percent / 100) * price;

  const handleUploadImage = async (file) => {
    setLoading(true);
    const url = await uploadFile({
      file,
      storageName: `uploads/${user.id}`,
    });
    form.setFieldValue("image", url);
    setLoading(false);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory(value),
  });

  const mappedCategories = data?.map((item) => item.name);

  const { data: category, isSuccess } = useQuery({
    queryKey: ["category"],
    queryFn: () => getProductCategory(state.category_id),
    onSuccess: () => {
      setSelectedValue(category?.name);
    },
  });

  const updateProductCategoryMutation = useMutation({
    mutationFn: (item) => updateProductCategory(item.value, item.id),
  });

  const updateCategory = async () => {
    await updateProductCategoryMutation.mutateAsync({
      value: value,
      id: state.id,
    });
  };

  const returnDashboard = async () => {
    navigate("/admin");
  };

  const updateSaleMutation = useMutation({
    mutationFn: (item) => updateSale(item.sale, item.productId),
  });

  const handleUpdateSale = async () => {
    setSale(!isSale);
    await updateSaleMutation.mutateAsync({
      sale: !isSale,
      productId: state.id,
    });
  };

  const updateProductMutation = useMutation({
    mutationFn: (item) => updateProduct(item, item.id),
    onSuccess: () => {
      setLoading(false);
      updateCategory();
      handleSuccessUpdateNotification(name);
      queryClient.invalidateQueries("products", state.id);
    },
  });

  const handleUpdateProduct = async () => {
    setLoading(true);
    const update = {
      name: name === "" ? state.name : name,
      description: description === "" ? state.description : description,
      price: price === null ? state.price : price,
      quantity: quantity === "" ? state.quantity : state.quantity + quantity,
      sale_price:
        sale_price === null ? prevPercentageCalc.toFixed(2) : sale_price,
      image: image === "" ? state.image : image,
    };

    await updateProductMutation.mutateAsync({ ...update, id: state.id });
  };

  React.useEffect(() => {
    if (value !== "") {
      refetch();
    }
  }, [value]);

  return (
    <div className={classes.wrapper}>
      <Title order={2} className={classes.title} align="center" mb={20}>
        Edit product
      </Title>

      <Form onSubmit={form.onSubmit(handleUpdateProduct)}>
        <Image mx="auto" maw={300} src={state.image} alt="No image"></Image>
        <Group>
          <FileButton
            mt={10}
            onChange={(file) => {
              handleUploadImage(file);
              return setFile(file);
            }}
            accept="image/png,image/jpeg,image/jpg">
            {(props) => <Button {...props}>Change Image</Button>}
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
                mx="auto"
                src={image}
                maw={300}
                alt="Random image"
                width="100%"
              />
            )}
          </Group>
        )}
        <TextInput
          label={`Product name : ${state.name}`}
          placeholder={state.name}
          {...form.getInputProps("name")}
        />

        <TextInput
          label={`Description: ${state.description}`}
          placeholder={state.description}
          {...form.getInputProps("description")}
        />

        <NumberInput
          precision={2}
          label={`Price: $ ${state.price}`}
          placeholder={state.price}
          {...form.getInputProps("price")}
        />

        <Checkbox
          m="auto"
          mt={20}
          mb={20}
          color="dark"
          checked={isSale}
          onChange={handleUpdateSale}
          label="Item on Sale"
        />
        {isSale && (
          <NumberInput
            mb={10}
            label={
              percent > 0 ? `Current sale ${percent} %` : `Current sale 0 %`
            }
            onChange={(number) => {
              let total;

              if (price === null) {
                let calc = ((state.price / 100) * number).toFixed(2);
                total = (state.price - calc).toFixed(2);
              }
              if (price !== null) {
                let calc = ((price / 100) * number).toFixed(2);
                total = (price - calc).toFixed(2);
              }

              form.setFieldValue("sale_price", total);
              setPercent(number);
            }}
            value={percent}
          />
        )}

        <NumberInput
          label={`Quantity: ${state.quantity} pcs`}
          placeholder={state.quantity}
          {...form.getInputProps("quantity")}
        />

        {!isLoading && (
          <Select
            mb={10}
            label={`Product category: ${isSuccess && category?.name}`}
            searchable
            clearable
            placeholder="Change product category"
            value={value}
            data={mappedCategories}
            onChange={setValue}
          />
        )}

        <Group mt={20}>
          <Button type="submit" loading={loading} miw={120}>
            Submit
          </Button>

          <Button onClick={returnDashboard}>Return</Button>
        </Group>
      </Form>
    </div>
  );
};

export default Edit;
