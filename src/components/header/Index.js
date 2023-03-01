import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Drawer,
} from "@mantine/core";

import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/Index";
import { supabase } from "../../config/Supabase";
import { IconShoppingCart } from "@tabler/icons";
import ShoppingItem from "../shoppingItem/Index";
import {
  DrawerWrapper,
  DrawerSlider,
  CheckoutBtn,
  Shopping,
  SelectedItems,
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
  const { user, setUser, filterData } = useContext(AuthContext);

  const navigateLogin = async () => {
    navigate("/login");
  };
  const navigateRegister = async () => {
    navigate("/register");
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    } else {
      setUser(null);
      alert(`${user.email} logged out`);
    }
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
            className={classes.hiddenMobile}></Group>
          <DrawerSlider
            opened={opened}
            onClose={() => setOpened(false)}
            title="Shopping Cart"
            padding="xl"
            size="xl">
            {/* Drawer content */}
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

            <DrawerWrapper>
              <div>
                <h5>Total:{sumPrice(data)}</h5>
                <button>Pay</button>
              </div>
              {/* <Button onClick={deleteAll}>Delete</Button> */}
              {user ? <CheckoutBtn>$ Checkout</CheckoutBtn> : ""}
            </DrawerWrapper>
          </DrawerSlider>
          {user ? (
            <Group className={classes.hiddenMobile}>
              Welcome {user.email} !
              <Button onClick={() => setOpened(true)}>
                <IconShoppingCart size={25} />
              </Button>
              <Button onClick={signOut}>Logout</Button>
            </Group>
          ) : (
            <Group className={classes.hiddenMobile}>
              <Button onClick={() => setOpened(true)}>
                <IconShoppingCart size={25} />
              </Button>
              <Button variant="default" onClick={navigateLogin}>
                Log in
              </Button>
              <Button onClick={navigateRegister}>Sign up</Button>
              {data.length < 1 ? (
                ""
              ) : (
                <SelectedItems>{data.length}</SelectedItems>
              )}
            </Group>
          )}
        </Group>
      </Header>
    </Box>
  );
}

export default HeaderTabs;
