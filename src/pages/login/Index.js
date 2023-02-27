import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionIcon, TextInput } from "@mantine/core";
import { IconAt, IconEye, IconEyeOff } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { Button, Group } from "@mantine/core";

import { Form, StyledButton, Div, TitleHeader } from "./Styles";

const Login = (props) => {
  const form = useForm({
    email: "",
    password: "",
  });
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();
  // const { signIn, setUser, user } = React.useContext(AuthContext);

  const [type, settype] = useState("password");
  const { email, password } = form;

  const handleSubmit = async (e) => {
    const { email, password } = form.values;

    console.log(form.values);
  };

  const returnHome = async () => {
    navigate("/");
  };

  return (
    <Div>
      <TitleHeader>Login</TitleHeader>
      <Form onSubmit={form.onSubmit(handleSubmit)}>
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

        <StyledButton type="submit">Login</StyledButton>
        <StyledButton onClick={returnHome}>Return</StyledButton>
      </Form>
    </Div>
  );
};

export default Login;
