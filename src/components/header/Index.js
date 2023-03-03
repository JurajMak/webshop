import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Drawer,
  Flex,
  Text,
  Indicator,
} from "@mantine/core";

import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/Index";
import { supabase } from "../../config/Supabase";
import { IconShoppingCart } from "@tabler/icons";
import ShoppingItem from "../shoppingItem/Index";
import {
  DrawerWrapper,
  CheckoutBtn,
  Shopping,
  SelectedItems,
  DrawerHeader,
  SelectedItemsUser,
  CheckoutWrapper,
  TextWrapper,
} from "./Styles";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
  },
}));

export function HeaderTabs({ data, onRemove, onDelete, onQuantity }) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useContext(AuthContext);

  const navigateLogin = async () => {
    navigate("/login");
  };
  const navigateRegister = async () => {
    navigate("/register");
  };

  const sumPrice = (item) => {
    return item
      .reduce((acc, cart) => {
        return cart.quantity * cart.price + acc;
      }, 0)
      .toFixed(2);
  };
  console.log(data);
  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          Application Name
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          ></Group>
          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            padding="xs"
            size="xl"
          >
            <DrawerWrapper>
              {/* Drawer content */}

              <DrawerHeader>
                <Text fz="lg">Shopping Cart</Text>
              </DrawerHeader>
              <Shopping>
                {data?.map((item) => {
                  return (
                    <ShoppingItem
                      key={item.id}
                      data={item}
                      onRemove={onRemove}
                      onQuantity={onQuantity}
                      onDelete={onDelete}
                    />
                  );
                })}
              </Shopping>

              <CheckoutWrapper>
                <TextWrapper>
                  <Text mb={30} ml={100} mt={50} fz="lg">
                    Total :
                  </Text>
                  <Text mr={150} mt={50} fz="lg">
                    $ {sumPrice(data)}
                  </Text>
                </TextWrapper>

                {user ? (
                  <CheckoutBtn>$ Checkout</CheckoutBtn>
                ) : (
                  <CheckoutBtn onClick={navigateLogin}>
                    Log in to shop
                  </CheckoutBtn>
                )}
              </CheckoutWrapper>
            </DrawerWrapper>
          </Drawer>
          {user ? (
            <Group className={classes.hiddenMobile}>
              Welcome {user.email} !
              {data.length < 1 ? (
                ""
              ) : (
                <Indicator
                  color="gold"
                  position="bottom-start"
                  inline
                  label={data.length}
                  size={30}
                  styles={{
                    common: {
                      color: "black",
                    },
                  }}
                >
                  <Button onClick={() => setOpened(true)}>
                    <IconShoppingCart size={25} />
                  </Button>
                </Indicator>
              )}
              <Button onClick={signOut}>Logout</Button>
            </Group>
          ) : (
            <Group className={classes.hiddenMobile}>
              {data.length < 1 ? (
                ""
              ) : (
                <Indicator
                  color="gold"
                  position="bottom-start"
                  inline
                  label={data.length}
                  size={30}
                  styles={{
                    common: {
                      color: "black",
                    },
                  }}
                >
                  <Button onClick={() => setOpened(true)}>
                    <IconShoppingCart size={25} />
                  </Button>
                </Indicator>
              )}

              <Button variant="default" onClick={navigateLogin}>
                Log in
              </Button>
              <Button onClick={navigateRegister}>Sign up</Button>
            </Group>
          )}
        </Group>
      </Header>
    </Box>
  );
}

export default HeaderTabs;

// <Indicator
// color="gold"
// position="bottom-start"
// inline
// label={data.length}
// size={20}
// >
// <Button onClick={() => setOpened(true)}>
//   <IconShoppingCart size={25} />
// </Button>
// </Indicator>
