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
  Image,
  useMantineTheme,
  ActionIcon,
  Tabs,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Index";
import { supabase } from "../../config/Supabase";
import { IconShoppingCart } from "@tabler/icons";
import { handlePaymentNotification } from "../notifications/checkoutNotification";
import UserMenu from "../userMenu/Index";
import SearchBar from "../search/Index";
import { sumTotal } from "../../utils/sumTotal";
import CartDrawer from "../cartDrawer/Index";
import { useStyles } from "./Styles";

export function HeaderTabs({
  orders,
  onRemove,
  onDelete,
  onQuantity,
  onClear,
  onText,
  onEnter,
  onBtn,
  onProduct,
  onCategory,
  onAll,
}) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { height, width } = useViewportSize();

  const navigateLogin = async () => {
    navigate("/login");
  };

  const totalString = sumTotal(orders);
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

  return (
    <Box>
      <Header height={width < 500 ? 140 : 110} px="sm" bg="dark.4">
        <Flex direction="column">
          <Group position="apart" sx={{ height: "100%", gap: 0 }} mt={10}>
            <Group
              sx={{ height: "100%" }}
              spacing={0}
              className={classes.hiddenMobile}
              position="apart">
              <Text
                mr={width * 0.25}
                fw={500}
                color={theme.colors.gray[3]}
                onClick={() => navigate("/")}
                sx={{
                  cursor: "pointer",
                }}>
                App logo/name
              </Text>
              <SearchBar
                placeholder="Search products..."
                miw={width * 0.3}
                size="xs"
                radius="md"
                p={10}
                onChange={onText}
                onKeyPress={onEnter}
                onClick={onBtn}
              />
              <Button
                variant="transparent"
                color="dark"
                sx={{
                  [".mantine-Button-label"]: {
                    color: "white",
                  },
                }}
                onClick={onAll}>
                Reset search
              </Button>
            </Group>
            <CartDrawer
              handleCheckout={handleCheckout}
              loading={loading}
              opened={opened}
              setOpened={setOpened}
              orders={orders}
              onRemove={onRemove}
              onQuantity={onQuantity}
              onDelete={onDelete}
            />
            {user?.user_metadata.role === "user" ? (
              <Group
                position="apart"
                spacing="xl"
                miw={width < 500 && width * 0.9}>
                <UserMenu orders={orders} onDrawer={() => setOpened(true)} />

                {width < 500 && (
                  <Text fw={500} color={theme.colors.gray[3]}>
                    App logo/name
                  </Text>
                )}

                {orders.length > 0 && (
                  <Indicator
                    mx={10}
                    // color={theme.colors.blue[6]}
                    color={theme.colors.yellow[6]}
                    sx={{
                      [".mantine-Indicator-common"]: { color: "black" },
                    }}
                    position="bottom-start"
                    inline
                    label={orders.length}
                    size={20}>
                    <ActionIcon
                      variant="transparent"
                      color="gray.0"
                      onClick={() => setOpened(true)}>
                      <IconShoppingCart size={25} stroke={2} />
                    </ActionIcon>
                  </Indicator>
                )}
              </Group>
            ) : (
              <Group
                position="apart"
                spacing="xl"
                miw={width < 500 && width * 0.9}>
                <Button
                  sx={{
                    [`&:hover`]: {
                      background: theme.colors.yellow[6],
                      color: theme.colors.dark[4],
                    },
                  }}
                  color="dark.4"
                  onClick={navigateLogin}>
                  Log in
                </Button>
                {width < 500 && (
                  <Text fw={500} color={theme.colors.gray[3]}>
                    App logo/name
                  </Text>
                )}
                {orders.length > 0 && (
                  <Indicator
                    // color={theme.colors.blue[6]}
                    color={theme.colors.yellow[6]}
                    sx={{
                      [".mantine-Indicator-common"]: { color: "black" },
                    }}
                    position="bottom-start"
                    inline
                    label={orders.length}
                    size={20}>
                    <ActionIcon
                      variant="transparent"
                      color="gray.0"
                      onClick={() => setOpened(true)}>
                      <IconShoppingCart size={25} stroke={2} />
                    </ActionIcon>
                  </Indicator>
                )}
              </Group>
            )}

            {width < 500 && (
              <Group mt={20}>
                <SearchBar
                  miw={width * 0.95}
                  placeholder="Search products..."
                  size="xs"
                  radius="xl"
                  onChange={onText}
                  onKeyPress={onEnter}
                  onClick={onBtn}
                />
              </Group>
            )}
          </Group>
          <Group position="center">
            <Tabs
              mt={10}
              variant="pills"
              defaultValue="products"
              color="yellow"
              sx={{
                [".mantine-Tabs-tab"]: {
                  color: "white",
                  "&:hover": {
                    backgroundColor: theme.colors.yellow[6],
                  },
                },
              }}
              onTabChange={(value) => navigate(`/`)}>
              <Tabs.List position="center">
                <Tabs.Tab value="home">Home</Tabs.Tab>
                <Tabs.Tab value="products" onClick={onProduct}>
                  Products
                </Tabs.Tab>
                <Tabs.Tab value="category" onClick={onCategory}>
                  Categories
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Group>
        </Flex>
      </Header>
    </Box>
  );
}

export default HeaderTabs;
