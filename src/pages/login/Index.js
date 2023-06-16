import {
  createStyles,
  TextInput,
  Title,
  Text,
  Anchor,
  ActionIcon,
  Button,
  Group,
  Container,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconAt, IconEye, IconEyeOff } from "@tabler/icons";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { Form } from "./Styles";
import { AuthContext } from "../../contexts/Index";
import { useStyles } from "./Styles";
import { useViewportSize } from "@mantine/hooks";

export function UserLogin() {
  const { classes } = useStyles();
  const { height } = useViewportSize();
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
      navigate("/products");
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
    <Container
      sizes="xl"
      className={classes.wrapper}
      sx={{ minHeight: height }}>
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
          mb={10}
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
        <Group position="left" mt={20}>
          <Button color="dark" type="submit">
            Login
          </Button>
          <Button color="dark" onClick={returnHome}>
            Return
          </Button>
        </Group>
      </Form>

      <Text align="center" mt="md">
        Don&apos;t have an account?{" "}
        <Anchor color="cyan" href="#" weight={700} onClick={returnRegister}>
          Register
        </Anchor>
      </Text>
    </Container>
  );
}

export default UserLogin;
