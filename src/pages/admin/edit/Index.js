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
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { salePriceEdit } from "../../../utils/calcs";
import { percentageCalc, editSalePriceCalc } from "../../../utils/calcs";
import { useStyles } from "./Styles";

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
  const queryClient = new useQueryClient();
  const [percent, setPercent] = useState(
    state.is_sale ? percentageCalc(state.price, state.sale_price) : null
  );

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
      if (value !== "") {
        updateCategory();
      }
      handleSuccessUpdateNotification(name);
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleUpdateProduct = async () => {
    setLoading(true);
    const update = {
      name: name || state.name,
      description: description || state.description,
      price: price ?? state.price,
      quantity: quantity === "" ? state.quantity : state.quantity + quantity,
      sale_price: salePriceEdit(price, sale_price, percent, state),
      image: image || state.image,
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
            {(props) => (
              <Button color="dark" {...props}>
                Change Image
              </Button>
            )}
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
          label={`Price: € ${state.price}`}
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
              form.setFieldValue(
                "sale_price",
                editSalePriceCalc(price, state, number)
              );
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
          <Button color="dark" type="submit" loading={loading} miw={120}>
            Submit
          </Button>

          <Button color="dark" onClick={returnDashboard}>
            Return
          </Button>
        </Group>
      </Form>
    </div>
  );
};

export default Edit;
