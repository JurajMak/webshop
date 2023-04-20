import styled from "@emotion/styled";
import { Button } from "@mantine/core";

export const DivReducer = styled.div`
  max-width: 200px;

  border: none;
`;
export const Wrapper = styled.div``;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Transparent = styled(Button)`
  background: transparent;
  border: none;
`;
export const ImageWrapper = styled.img`
  object-fit: cover;
  width: 70px;
  height: 120px;
`;
