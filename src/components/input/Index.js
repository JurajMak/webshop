import React from "react";
import { Input } from "@mantine/core";

const TestInput = (props) => {
  return (
    <Input.Wrapper id="input-demo" label={props.label}>
      <Input id="input-demo" placeholder={props.placeholder} />
    </Input.Wrapper>
  );
};

export default TestInput;
