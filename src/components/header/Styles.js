import styled from "@emotion/styled";
import { Button } from "@mantine/core";

export const CartBtn = styled.button`
  background: transparent;
  color: white;
  border: none;
  &:before {
    content: f07a;
    font: var(--fa-font-solid);
    color: black;
  }
`;
