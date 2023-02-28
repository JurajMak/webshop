import styled from "@emotion/styled";
import { Button } from "@mantine/core";

export const DivReducer = styled.div`
  max-width: 250px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 50px;
`;

export const Transparent = styled(Button)`
  background: transparent;
  border: none;
`;
