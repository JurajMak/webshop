import {
  Paper,
  createStyles,
  TextInput,
  Title,
  Textarea,
  NumberInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
// import { AuthContext } from "../../contexts/Index";
import Image from "../../../assets/login.jpg";
// import Image from "../../../assets/register.jpg";

import { Form, StyledButton } from "./Styles";
const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      // "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
      `url(${Image})`,
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
  // const { signUp } = React.useContext(AuthContext);
  const { classes } = useStyles();
  const form = useForm({});
  const navigate = useNavigate();
  const [type, settype] = useState("password");

  const returnDashboard = async () => {
    navigate("/admin");
  };

  return (
    <div className={classes.wrapper}>
      {/* <Paper className={classes.form} radius={0} p={30}> */}
      <Title order={2} className={classes.title} align="center" pt={50} mb={50}>
        Edit product
      </Title>

      <Form onSubmit={form.onSubmit((e) => console.log(e))}>
        <TextInput
          label="Product name"
          placeholder="Product name"
          {...form.getInputProps("first_name")}
          // value={}
        />
        {/* <TextInput
          label="Description"
          placeholder="Enter your last name"
          {...form.getInputProps("last_name")}
          // value={}
        /> */}
        <Textarea
          label="Description of product"
          minRows={10}
          maxRows={10}
          // placeholder={state.description}
          // value={}
          {...form.getInputProps("description")}
        />
        <NumberInput
          label="Price"
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : "$ "
          }
        />
        <NumberInput label="Quantity" />

        <TextInput
          label="Category"
          placeholder="Category"
          {...form.getInputProps("first_name")}
          // value={}
        />

        <StyledButton type="submit">Submit</StyledButton>
        <StyledButton onClick={returnDashboard}>Return</StyledButton>
      </Form>
      {/* </Paper> */}
    </div>
  );
};

export default Edit;
