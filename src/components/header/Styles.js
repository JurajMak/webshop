import styled from "@emotion/styled";

export const CartBtn = styled.button`
  background: transparent;

  border: none;
  &:after {
    content: "\f07a";
    font: var(--fa-font-solid);
    color: black;
  }
`;
