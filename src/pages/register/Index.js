import {
  createStyles,
  TextInput,
  Checkbox,
  Title,
  ActionIcon,
  Button,
  Group,
  Container,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconAt, IconEye, IconEyeOff } from "@tabler/icons";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { AuthContext } from "../../contexts/Index";
import { useStyles } from "./Styles";
import { useViewportSize } from "@mantine/hooks";
import { Form } from "../login/Styles";

const RegisterForm = () => {
  const { signUp } = React.useContext(AuthContext);
  const { classes } = useStyles();
  const { height } = useViewportSize();

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
    if (data) {
      navigate("/login");
    }
  };

  const returnHome = async () => {
    navigate("/");
  };

  return (
    <Container
      sizes="xl"
      className={classes.wrapper}
      sx={{ minHeight: height }}>
      {/* <Paper className={classes.form} radius={0} p={30}> */}
      <Title
        order={2}
        className={classes.title}
        align="center"
        pt={100}
        mb={50}>
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
          mt={20}
          color="dark"
          {...form.getInputProps("is_admin")}
        />
        <Group mt={20}>
          <Button color="dark" type="submit">
            Submit
          </Button>
          <Button color="dark" onClick={returnHome}>
            Return
          </Button>
        </Group>
      </Form>

      {/* </Paper> */}
    </Container>
  );
};

export default RegisterForm;
