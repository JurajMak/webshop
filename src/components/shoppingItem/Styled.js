import styled from "@emotion/styled";
import { Button } from "@mantine/core";

export const DivReducer = styled.div`
  max-width: 200px;
  // border: 1px solid black;
  // border-radius: 8px;
  border: none;
`;
export const Wrapper = styled.div``;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 80px;
  // border: 1px solid black;
  // border-radius: 8px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 30px;
`;

export const Transparent = styled(Button)`
  background: transparent;
  border: none;
`;
export const ImageWrapper = styled.img`
  // width: 100px;
`;
