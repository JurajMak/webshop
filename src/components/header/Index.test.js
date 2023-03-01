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
import { DrawerWrapper } from "./Styles";

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

export function HeaderTabs() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, data, filterData } = useContext(AuthContext);

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

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          Application Name
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}></Group>
          {user ? (
            <Group className={classes.hiddenMobile}>
              Welcome {user.email} !
              {/* <Button onClick={() => setOpened(true)}>
                <IconShoppingCart size={25} />
              </Button> */}
              <Button onClick={signOut}>Logout</Button>
            </Group>
          ) : (
            <Group className={classes.hiddenMobile}>
              {/* <Button onClick={() => setOpened(true)}>
                <IconShoppingCart size={25} />
              </Button> */}
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

// const handleAddCart = (e, item) => {
//   const key = `user_${user.email}_cart_${item.id}`;
//   const data = localStorage.getItem(key);
//   const cartItem = data ? JSON.parse(data) : { ...item, quantity: 0 };

//   const updatedItem = { ...cartItem, quantity: cartItem.quantity + 1 };
//   localStorage.setItem(key, JSON.stringify(updatedItem));
//   setShoppingData([...shoppingData, updatedItem]);
// };

// const handleDeleteItem = (e, id) => {
//   const key = `user_${user.email}_cart_${id}`;
//   setShoppingData(shoppingData.filter((item) => item.id !== id));
// };
