import {
  createStyles,
  TextInput,
  Title,
  Text,
  Anchor,
  ActionIcon,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconAt, IconEye, IconEyeOff } from "@tabler/icons";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { Form, StyledButton } from "./Styles";
import { AuthContext } from "../../contexts/Index";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",

    // `url(${Image})`,
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

export function UserLogin() {
  const { classes } = useStyles();
  const form = useForm({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { signIn, setUser } = React.useContext(AuthContext);

  const [type, settype] = useState("password");
  const { email, password } = form;

  const handleSubmit = async () => {
    const { email, password } = form.values;

    const data = await signIn({
      email,
      password,
    });
    if (data) {
      setUser(data.user);
      navigate("/");
      if (data.user.user_metadata.role === "admin") {
        navigate("/admin");
        return;
      }
      return;
    }
  };

  const returnHome = async () => {
    navigate("/");
  };

  const returnRegister = async () => {
    navigate("/register");
  };

  return (
    <div className={classes.wrapper}>
      {/* <Paper className={classes.form} radius={0} p={30}> */}

      <Title
        order={2}
        className={classes.title}
        align="center"
        pt={100}
        mb={50}>
        Welcome back!
      </Title>

      <Form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          icon={<IconAt size={14} />}
          {...form.getInputProps("email")}
        />

        <TextInput
          type={type}
          label="Password"
          placeholder="************"
          value={password}
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

        <StyledButton type="submit">Login</StyledButton>
        <StyledButton onClick={returnHome}>Return</StyledButton>
      </Form>

      <Text align="center" mt="md">
        Don&apos;t have an account?{" "}
        <Anchor href="#" weight={700} onClick={returnRegister}>
          Register
        </Anchor>
      </Text>

      {/* </Paper> */}
    </div>
  );
}

export default UserLogin;
