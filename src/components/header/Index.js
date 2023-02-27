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
import React, { useState } from "react";

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

  const returnHome = async () => {
    navigate("/");
  };

  const returnProducts = async () => {
    navigate("/products");
  };
  const navigateLogin = async () => {
    navigate("/login");
  };
  const navigateRegister = async () => {
    navigate("/register");
  };

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <MantineLogo size={30} />
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <a href="#" className={classes.link} onClick={returnHome}>
              Home
            </a>

            <a href="#" className={classes.link} onClick={returnProducts}>
              Products
            </a>
          </Group>

          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title="Cart"
            padding="xl"
            size="xl"
          >
            {/* Drawer content */}
          </Drawer>

          <Group className={classes.hiddenMobile}>
            <Button onClick={() => setOpened(true)}>Cart</Button>
            <Button variant="default" onClick={navigateLogin}>
              Log in
            </Button>
            <Button onClick={navigateRegister}>Sign up</Button>
          </Group>
        </Group>
      </Header>
    </Box>
  );
}

export default HeaderTabs;
