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

import { Form, StyledButton } from "./Styles";
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

const Edit = () => {
  const { classes } = useStyles();
  const form = useForm({});
  const navigate = useNavigate();

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
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Description"
          placeholder="Description of product"
          {...form.getInputProps("description")}
        />

        <TextInput label="Price" />
        <TextInput label="Quantity" />

        <TextInput
          label="Category"
          placeholder="Category"
          {...form.getInputProps("category")}
        />

        <StyledButton type="submit">Submit</StyledButton>
        <StyledButton onClick={returnDashboard}>Return</StyledButton>
      </Form>
      {/* </Paper> */}
    </div>
  );
};

export default Edit;
