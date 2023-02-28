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

export function HeaderTabs(props) {
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [storageData, setStoragedData] = useState([cartItems]);

  const { title, price, quantity, style, id } = storageData;

  const returnHome = async () => {
    navigate("/");
  };

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

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem("cart"));
  //   if (items) {
  //     setStoragedData(items);
  //   }
  // }, []);

  const handleDeleteItem = (e, id) => {
    setStoragedData(
      storageData?.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      })
    );
  };

  const deleteAll = () => {
    localStorage.clear();
  };

  console.log("head", storageData);
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
            title="Shopping Cart"
            padding="xl"
            size="xl"
          >
            {/* Drawer content */}
            <DrawerWrapper>
              <ShoppingItem />
              {/* <Button onClick={deleteAll}>Delete</Button> */}
              {user ? <Button>Checkout</Button> : ""}
            </DrawerWrapper>
          </Drawer>
          {user ? (
            <Group className={classes.hiddenMobile}>
              Welcome {user.email} !
              <Button onClick={() => setOpened(true)}>
                {" "}
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
            </Group>
          )}
        </Group>
      </Header>
    </Box>
  );
}

export default HeaderTabs;
