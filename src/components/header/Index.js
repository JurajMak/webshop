import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Drawer,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
// import { ImageLogo, CartBtn } from "./Styles";
import { AuthContext } from "../../contexts/Index";
import { supabase } from "../../config/Supabase";

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
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

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

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          {/* <MantineLogo size={30} /> */}
          Application Logo
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}>
            <a href="#" className={classes.link} onClick={returnHome}>
              Home
            </a>

            <a href="#" className={classes.link}>
              Products
            </a>
          </Group>
          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title="Cart"
            padding="xl"
            size="xl">
            {/* Drawer content */}
            {user ? <Button>Checkout</Button> : ""}
          </Drawer>
          {user ? (
            <Group className={classes.hiddenMobile}>
              Welcome {user.email} !
              <Button onClick={() => setOpened(true)}>Cart</Button>
              <Button onClick={signOut}>Logout</Button>
            </Group>
          ) : (
            <Group className={classes.hiddenMobile}>
              <Button onClick={() => setOpened(true)}>Cart</Button>
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

//  <Group className={classes.hiddenMobile}>
//       <Button onClick={() => setOpened(true)}>Cart</Button>
//       <Button variant="default" onClick={navigateLogin}>
//         Log in
//       </Button>
//       <Button onClick={navigateRegister}>Sign up</Button>
//     </Group>
