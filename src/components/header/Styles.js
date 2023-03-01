import styled from "@emotion/styled";
import { Button, Drawer } from "@mantine/core";

export const CartBtn = styled.button`
  background: transparent;
  border: none;
`;

export const DrawerSlider = styled(Drawer)`
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  // display: grid;
`;

export const DrawerWrapper = styled.div``;

export const CheckoutBtn = styled(Button)`
  width: 250px;
  margin-left: 90px;
`;

export const Shopping = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SelectedItems = styled.div`
  border-radius: 50%;
  position: absolute;
  background-color: gold;
  font-size: 15px;
  min-width: 20px;
  min-height: 20px;
  text-align: center;
  top: 30px;
  right: 260px;
`;
