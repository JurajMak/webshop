import {
  TextInput,
  Title,
  Text,
  Anchor,
  ActionIcon,
  Button,
  Group,
  Container,
  Stack,
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
      }
    }
  };

  const returnRegister = () => {
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

        <Group position="apart" mt={20}>
          <Button color="dark" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="dark" type="submit" mr={10}>
            Login
          </Button>
        </Group>
      </Form>

      <Text align="center" mt="md">
        Don&apos;t have an account?{" "}
        <Anchor color="cyan" href="#" weight={700} onClick={returnRegister}>
          Register
        </Anchor>
      </Text>
      <Stack mt={20}>
        <Text align="center" fw={500}>
          ADMIN: test@admin.com password: test123
        </Text>
        <Text align="center" fw={500}>
          USER: test@user.com password: test123
        </Text>
      </Stack>
    </Container>
  );
}

export default UserLogin;
