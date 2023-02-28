import styled from "@emotion/styled";
import { Button } from "@mantine/core";

export const Form = styled.form`
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 20px;
  // background: white;
`;

export const Div = styled.div`
  margin-top: 200px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledButton = styled(Button)`
  margin: 10px;
`;

export const TitleHeader = styled.h1`
  text-align: center;
`;
