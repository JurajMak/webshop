import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  ActionIcon,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconAt, IconEye, IconEyeOff } from "@tabler/icons";
import { useForm } from "@mantine/form";
import React, { useState } from "react";

import { Form, StyledButton, Div, TitleHeader } from "../login/Styles";
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

const RegisterForm = () => {
  const { classes } = useStyles();
  const form = useForm({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [type, settype] = useState("password");
  const { email, password, first_name, last_name } = form;

  const handleSubmit = async (e) => {
    const { email, password, first_name, last_name } = form.values;

    console.log(form.values);
  };

  const returnHome = async () => {
    navigate("/");
  };

  return (
    <div className={classes.wrapper}>
      {/* <Paper className={classes.form} radius={0} p={30}> */}
      <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
        Register
      </Title>

      <Form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="First Name"
          placeholder="Enter your first name"
          icon={<IconAt size={14} />}
          {...form.getInputProps("first_name")}
          value={first_name}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter your last name"
          icon={<IconAt size={14} />}
          {...form.getInputProps("last_name")}
          value={last_name}
        />

        <TextInput
          label="Email"
          placeholder="Enter your email"
          icon={<IconAt size={14} />}
          {...form.getInputProps("email")}
          value={email}
        />

        <TextInput
          type={type}
          label="Password"
          placeholder="************"
          rightSection={
            <ActionIcon
              onClick={() =>
                type === "text" ? settype("password") : settype("text")
              }
            >
              {type === "password" ? <IconEye /> : <IconEyeOff />}
            </ActionIcon>
          }
          {...form.getInputProps("password")}
          value={password}
        />

        <StyledButton type="submit">Submit</StyledButton>
        <StyledButton onClick={returnHome}>Return</StyledButton>
      </Form>
      {/* </Paper> */}
    </div>
  );
};

export default RegisterForm;
