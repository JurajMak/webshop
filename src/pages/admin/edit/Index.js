import {
  Paper,
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
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import React, { useState, useContext } from "react";
import { supabase } from "../../../config/Supabase";
import uploadFile from "../../../utils/uploadFile";
import { Form, SaleWrapper } from "./Styles";
import { AuthContext } from "../../../contexts/Index";
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
      category: "",
      sale_price: null,
      salePercentage: "",
      image: "",
    },
  });
  const { user } = useContext(AuthContext);
  const [prevCategory, setPrevCategory] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    name,
    description,
    price,
    quantity,
    category,
    salePercentage,
    sale_price,
    image,
  } = form.values;
  const [isSale, setSale] = useState(state.is_sale);
  const [file, setFile] = useState([]);
  const [filepath, setFilePath] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const percentageCalc = Math.floor(
    ((state.price - state.sale_price) / state.price) * 100
  );
  const [percent, setPercent] = React.useState(
    state.is_sale ? percentageCalc : ""
  );

  const handleUploadImage = async (file) => {
    const url = await uploadFile({
      file,
      storageName: `uploads/${user.id}`,
    });
    form.setFieldValue("image", url);
  };

  const updateProductName = async (e) => {
    const { data, error } = await supabase
      .from("products")
      .update({ name })
      .match({ id: state.id });
    if (error) {
      console.log("nevalja", error.message);
    } else {
      console.log("proso", name);
    }
  };
  const updateProductDescription = async (e) => {
    const { data, error } = await supabase
      .from("products")
      .update({ description })
      .match({ id: state.id });
    if (error) {
      console.log("nevalja", error.message);
    } else {
      console.log("proso", description);
    }
  };

  const updateProductPrice = async (e) => {
    const { data, error } = await supabase
      .from("products")
      .update({ price })
      .match({ id: state.id });
    if (error) {
      console.log("nevalja", error.message);
    } else {
      console.log("proso", price);
    }
  };

  const updateProductQuantity = async (e) => {
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("quantity")
      .eq("id", state.id)
      .single();

    if (productError) {
      console.log("nevalja", productError.message);
      return;
    }

    const existingQuantity = productData.quantity;

    const updatedQuantity = existingQuantity + Number(quantity);

    const { data, error } = await supabase
      .from("products")
      .update({ quantity: updatedQuantity })
      .match({ id: state.id });

    if (error) {
      console.log("nevalja", error.message);
    } else {
      console.log("proso", typeof existingQuantity);
    }
  };

  const handleSalePrice = async () => {
    let calc = Math.round((state.price / 100) * salePercentage);
    let total = state.price - calc;
    console.log(typeof total);
    const { data, error } = await supabase
      .from("products")
      .update({ sale_price: total })
      .match({ id: state.id });
    if (error) {
      console.log("nevalja", error.message);
    } else {
      console.log("proso", total);
    }
  };

  const getProductCategory = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("id", state.category_id)
      .single();
    console.log(data);
    setPrevCategory(data.name);
  };

  const updateProductCategory = async () => {
    const { data: categories } = await supabase
      .from("categories")
      .select("*")
      .eq("name", category)
      .single();

    const { data, error } = await supabase
      .from("products")
      .update({
        category_id: categories.id,
      })
      .match({ id: state.id });
  };

  const returnDashboard = async () => {
    navigate("/admin");
  };

  const handleIsSale = async (e) => {
    setSale(!isSale);
    console.log(isSale);
    const { data, error } = await supabase
      .from("products")
      .update({ is_sale: !isSale })
      .match({ id: state.id });
    if (error) {
      console.log("nevalja", error.message);
    } else {
      console.log("proso", isSale);
    }
  };

  const updateAll = async (e) => {
    const { data: categories } = await supabase
      .from("categories")
      .select("*")
      .eq("name", category)
      .single();

    if (category !== "") {
      const { data: a, error: b } = await supabase
        .from("products")
        .update({
          category_id: categories.id,
        })
        .match({ id: state.id });
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .update({
        name: name === "" ? state.name : name,
        description: description === "" ? state.description : description,
        price: price === null ? state.price : price,
        quantity: quantity === "" ? state.quantity : quantity,
        sale_price: sale_price === null ? null : sale_price,
        image: image === "" ? state.image : image,
      })

      .match({ id: state.id });
    if (error) {
      console.log("nevalja", error.message);
    } else {
      console.log("proslo", form.values);
    }
    // form.reset();
  };

  React.useEffect(() => {
    getProductCategory();
  }, []);

  return (
    <div className={classes.wrapper}>
      {/* <Paper className={classes.form} radius={0} p={30}> */}
      <Title order={2} className={classes.title} align="center" mb={20}>
        Edit product
      </Title>

      <Form onSubmit={form.onSubmit(updateAll)}>
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
        <Button mt={20} mb={20} onClick={updateProductName}>
          Edit product
        </Button>
        <TextInput
          label={`Description: ${state.description}`}
          placeholder={state.description}
          {...form.getInputProps("description")}
        />
        <Button mt={20} mb={20} onClick={updateProductDescription}>
          Edit description
        </Button>

        <NumberInput
          precision={2}
          label={`Price: $ ${state.price}`}
          placeholder={state.price}
          {...form.getInputProps("price")}
        />
        <Button mt={20} mb={20} onClick={updateProductPrice}>
          Edit price
        </Button>

        <Checkbox
          m="auto"
          mt={20}
          mb={20}
          checked={isSale}
          onChange={handleIsSale}
          label="Item on Sale"
        />
        {isSale && (
          <NumberInput
            mb={10}
            label={
              percent > 0 ? `Current sale ${percent} %` : `Current sale 0 %`
            }
            onChange={(number) => {
              // let calc = Math.floor((state.price / 100) * number);
              let calc = (state.price / 100) * number;
              let total = state.price - calc;

              form.setFieldValue("sale_price", total.toFixed(2));
              setPercent(number);
            }}
            value={percent}
          />
        )}

        <SaleWrapper>
          {isSale && (
            <Button mt={20} mb={20} onClick={handleSalePrice}>
              Set sale
            </Button>
          )}
        </SaleWrapper>

        <NumberInput
          label={`Quantity: ${state.quantity} pcs`}
          placeholder={state.quantity}
          {...form.getInputProps("quantity")}
        />
        <Button mt={10} mb={10} onClick={updateProductQuantity}>
          Edit quantity
        </Button>

        <TextInput
          label={`Category: ${prevCategory}`}
          placeholder={prevCategory}
          {...form.getInputProps("category")}
        />

        <SaleWrapper>
          <Button mt={20} onClick={updateProductCategory}>
            Edit Category
          </Button>

          <Button mt={20} type="submit">
            Submit
          </Button>

          <Button mt={20} onClick={returnDashboard}>
            Return
          </Button>
        </SaleWrapper>
      </Form>
      {/* </Paper> */}
    </div>
  );
};

export default Edit;
