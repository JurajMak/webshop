import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Drawer,
  Text,
  Indicator,
  Divider,
  ScrollArea,
  Flex,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Index";
import { supabase } from "../../config/Supabase";
import { IconShoppingCart } from "@tabler/icons";
import { CartItem } from "../cartItem/Index";
import { handlePaymentNotification } from "../notifications/checkoutNotification";
import UserMenu from "../userMenu/Index";

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
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
      // paddingBottom: 30,
    },
  },
  mobile: {
    [theme.fn.smallerThan("sm")]: {
      position: "right",
    },
  },
}));

export function HeaderTabs({
  orders,
  onRemove,
  onDelete,
  onQuantity,
  onClear,
}) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { height, width } = useViewportSize();

  const navigateLogin = async () => {
    navigate("/login");
  };
  const navigateRegister = async () => {
    navigate("/register");
  };

  const sumPrice = (item) => {
    return item
      .reduce((acc, cart) => {
        const total = cart.is_sale ? cart.sale_price : cart.price;
        return cart.quantity * total + acc;
      }, 0)
      .toFixed(2);
  };

  const totalString = sumPrice(orders);
  const total = Number(totalString).toFixed();

  const handleCheckout = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .insert({ user_id: user.id, total: total });

    if (error) {
      console.error(error);
      return;
    }

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .select("id")
      .order("created_at", { ascending: false })
      .limit(1)
      .eq("user_id", user.id);

    if (orderError) {
      console.error(orderError);
      return;
    }
    const { data: products } = await supabase.from("products").select("*");
    const orderId = orderData[0].id;

    const { error: productError } = await supabase
      .from("order_products")
      .insert(
        orders.map((item) => ({
          product_id: item.id,
          user_id: user.id,
          order_id: orderId,
        }))
      );

    if (productError) {
      console.error(productError);
      return;
    }
    const { productsError } = await supabase
      .from("products")
      .update(
        orders.map((item) => ({
          quantity:
            products.find((product) => product.id === item.id).quantity -
            item.quantity,
        }))
      )
      .in(
        "id",
        orders.map((item) => item.id)
      );

    if (productsError) {
      console.error(productsError);
      return;
    }
    setLoading(false);
    handlePaymentNotification();
    onClear();
  };

  console.log(height);

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}>
            <Title>Web-shop</Title>
          </Group>
          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            padding="xs"
            size="xl">
            <Flex direction="column">
              <ScrollArea type="never" style={{ height: height * 0.7 }}>
                {orders?.map((item) => {
                  return (
                    <CartItem
                      key={item.id}
                      cartData={item}
                      onRemove={onRemove}
                      onQuantity={onQuantity}
                      onDelete={onDelete}
                    />
                  );
                })}
              </ScrollArea>

              {/* <Grid.Col> */}
              <Divider size="md" mb={30} />
              {/* </Grid.Col> */}

              <Flex mx="auto" direction="column" gap={20} align="center">
                <Group>
                  <Text fz="lg" fw={500}>
                    Total :
                  </Text>
                  <Text fz="lg" fw={500}>
                    $ {sumPrice(orders)}
                  </Text>
                </Group>

                {user?.user_metadata.role === "user" ? (
                  <Button
                    miw={250}
                    disabled={orders.length <= 0 ? true : false}
                    onClick={handleCheckout}
                    loading={loading}>
                    $ Checkout
                  </Button>
                ) : (
                  <Button miw={250} onClick={navigateLogin}>
                    Log in to shop
                  </Button>
                )}
              </Flex>
            </Flex>
            {/* </Grid> */}
          </Drawer>
          {user?.user_metadata.role === "user" ? (
            <Group>
              <UserMenu />
              {orders.length < 1 ? (
                ""
              ) : (
                <Indicator
                  color="gold"
                  position="bottom-start"
                  inline
                  label={orders.length}
                  size={30}
                  styles={{
                    common: {
                      color: "black",
                    },
                  }}>
                  <Button
                    onClick={() => setOpened(true)}
                    className={classes.mobile}
                    mr={30}>
                    <IconShoppingCart size={25} />
                  </Button>
                </Indicator>
              )}
            </Group>
          ) : (
            <Group>
              {orders.length < 1 ? (
                ""
              ) : (
                <Indicator
                  color="gold"
                  position="bottom-start"
                  inline
                  label={orders.length}
                  size={30}
                  styles={{
                    common: {
                      color: "black",
                    },
                  }}>
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
