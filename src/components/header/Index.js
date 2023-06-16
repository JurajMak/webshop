import {
  Header,
  Group,
  Button,
  Box,
  Text,
  Indicator,
  Flex,
  useMantineTheme,
  ActionIcon,
  UnstyledButton,
  Tabs,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Index";
import { supabase } from "../../config/Supabase";
import { IconShoppingCart } from "@tabler/icons";
import { handlePaymentNotification } from "../notifications/checkoutNotification";
import UserMenu from "../userMenu/Index";
import SearchBar from "../search/Index";
import { sumTotal } from "../../utils/sumTotal";
import CartDrawer from "../drawers/cartDrawer/Index";
import { useStyles } from "./Styles";
import { ReactComponent as Logo } from "../../assets/logo.svg";

export function HeaderTabs({
  orders,
  onRemove,
  onDelete,
  onQuantity,
  onClear,
  onText,
  onEnter,
  onBtn,
  onCategory,
  category,
}) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { height, width } = useViewportSize();
  // const [tabValue, setTabValue] = useState("");
  // const { tabValue } = useParams();
  const { pathname } = useLocation();

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
      <Header
        height={width < 768 ? 110 : 90}
        px="sm"
        bg="linear-gradient(to right, #062343, #041428, #000205)">
        <Flex direction="column">
          <Group position="apart" sx={{ height: "100%", gap: 0 }} mt={10}>
            <Group
              sx={{ height: "100%", marginTop: 10 }}
              spacing={10}
              className={classes.hiddenMobile}
              position="apart">
              <UnstyledButton onClick={() => navigate("/")}>
                <Flex justify="center" style={{ alignItems: "center" }}>
                  <Logo width={50} />
                  <Text c="white" fw={600} fz={20}>
                    ShopVert
                  </Text>
                </Flex>
              </UnstyledButton>
              {pathname !== "/" && (
                <>
                  <SearchBar
                    placeholder="Search products..."
                    miw={width * 0.3}
                    size="xs"
                    radius="md"
                    p={10}
                    ml={width > 1100 ? width * 0.2 : 0}
                    onChange={onText}
                    onKeyPress={onEnter}
                    onClick={onBtn}
                  />

                  <Button
                    variant="transparent"
                    color="gray.0"
                    className={classes.btn}
                    onClick={() => navigate("/products")}>
                    Products
                  </Button>
                </>
              )}
            </Group>
            {pathname === "/" && width > 768 && (
              <Group position="center">
                <Tabs
                  mt={width < 768 ? 10 : 5}
                  variant="outline"
                  // value={tabValue}
                  className={classes.tabs}
                  onTabChange={(value) => navigate(`/${value}`)}>
                  <Tabs.List position="center">
                    <Tabs.Tab value="products">Products</Tabs.Tab>
                    <Tabs.Tab value="categories" onClick={onCategory}>
                      Categories
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </Group>
            )}

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
                miw={width < 768 && width * 0.9}>
                {width < 768 && (
                  <UnstyledButton onClick={() => navigate("/")}>
                    <Flex justify="center" style={{ alignItems: "center" }}>
                      <Logo width={50} />
                    </Flex>
                  </UnstyledButton>
                )}

                {orders.length > 0 && (
                  <Indicator
                    mx={10}
                    color={theme.colors.yellow[8]}
                    className={classes.indicator}
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
                <UserMenu orders={orders} onDrawer={() => setOpened(true)} />
              </Group>
            ) : (
              <Group
                position="apart"
                spacing="xl"
                miw={width < 768 && width * 0.9}>
                {width < 768 && (
                  <UnstyledButton onClick={() => navigate("/")}>
                    <Flex justify="center" style={{ alignItems: "center" }}>
                      <Logo width={50} />
                    </Flex>
                  </UnstyledButton>
                )}
                {orders.length > 0 && (
                  <Indicator
                    color={theme.colors.yellow[8]}
                    className={classes.indicator}
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
                <Button
                  className={classes.btn}
                  color="dark.4"
                  onClick={() => navigate("/login")}>
                  Log in
                </Button>
              </Group>
            )}

            {width < 768 && pathname !== "/" && (
              <Group mt={10}>
                <SearchBar
                  miw={width * 0.9}
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
          {width < 768 && pathname === "/" && (
            <Group position="center">
              <Tabs
                mt={width < 768 ? 10 : 5}
                variant="outline"
                // value={tabValue}
                className={classes.tabs}
                onTabChange={(value) => navigate(`/${value}`)}>
                <Tabs.List position="center">
                  <Tabs.Tab value="products">Products</Tabs.Tab>
                  <Tabs.Tab value="categories" onClick={onCategory}>
                    Categories
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </Group>
          )}
        </Flex>
      </Header>
    </Box>
  );
}

export default HeaderTabs;
