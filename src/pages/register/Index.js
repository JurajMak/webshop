import {
  createStyles,
  TextInput,
  Checkbox,
  Title,
  ActionIcon,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconAt, IconEye, IconEyeOff } from "@tabler/icons";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { AuthContext } from "../../contexts/Index";
import { supabase } from "../../config/Supabase";

import { Form } from "../login/Styles";
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
  const { signUp } = React.useContext(AuthContext);
  const { classes } = useStyles();

  const form = useForm({
    full_name: "",
    email: "",
    password: "",
    is_admin: false,
  });
  const navigate = useNavigate();
  const [type, settype] = useState("password");

  const handleSubmit = async () => {
    const { email, password, full_name, is_admin } = form.values;
    const data = await signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          role: is_admin ? "admin" : "user",
        },
      },
    });

    navigate("/login");
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
          label="Full Name"
          placeholder="Enter your Full name"
          icon={<IconAt size={14} />}
          {...form.getInputProps("full_name")}
        />

        <TextInput
          label="Email"
          placeholder="Enter your email"
          withAsterisk
          icon={<IconAt size={14} />}
          {...form.getInputProps("email")}
        />

        <TextInput
          type={type}
          label="Password"
          placeholder="************"
          withAsterisk
          rightSection={
            <ActionIcon
              onClick={() =>
                type === "text" ? settype("password") : settype("text")
              }>
              {type === "password" ? <IconEye /> : <IconEyeOff />}
            </ActionIcon>
          }
          {...form.getInputProps("password")}
        />

        <Checkbox
          label="Are you admin?"
          mt={10}
          {...form.getInputProps("is_admin")}
        />

        <Button mt={10} mr={20} type="submit">
          Submit
        </Button>
        <Button onClick={returnHome}>Return</Button>
      </Form>

      {/* </Paper> */}
    </div>
  );
};

export default RegisterForm;
