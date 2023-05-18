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
  Tabs,
  Container,
  UnstyledButton,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";
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

export function HomeHeader({
  orders,
  onRemove,
  onDelete,
  onQuantity,
  onClear,
  onText,
  onEnter,
  onBtn,
  onAll,
}) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { height, width } = useViewportSize();
  // const [tabValue, setTabValue] = useState("");
  const { tabValue } = useParams();

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
      <Header height={width < 768 ? 140 : 110} px="sm" bg="dark.4">
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
                    Shopvert
                  </Text>
                </Flex>
              </UnstyledButton>
            </Group>
            <Group position="center">
              <Tabs
                mt={width < 768 ? 10 : 5}
                variant="pills"
                value={tabValue}
                color="yellow.8"
                sx={{
                  [".mantine-Tabs-tab"]: {
                    color: "white",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: theme.colors.yellow[8],
                      // color: theme.colors.dark[8],
                    },
                  },
                }}
                onTabChange={(value) => navigate(`/${value}`)}>
                <Tabs.List position="center">
                  <Tabs.Tab value="products">Products</Tabs.Tab>
                </Tabs.List>
              </Tabs>
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
                miw={width < 768 && width * 0.9}>
                <UserMenu orders={orders} onDrawer={() => setOpened(true)} />

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
                    // color={theme.colors.blue[6]}
                    color={theme.colors.yellow[8]}
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
                miw={width < 768 && width * 0.9}>
                <Button
                  sx={{
                    [`&:hover`]: {
                      background: theme.colors.yellow[8],
                      color: theme.colors.dark[4],
                    },
                  }}
                  color="dark.4"
                  onClick={() => navigate("/login")}>
                  Log in
                </Button>
                {width < 768 && (
                  <UnstyledButton onClick={() => navigate("/")}>
                    <Flex justify="center" style={{ alignItems: "center" }}>
                      <Logo width={50} />
                    </Flex>
                  </UnstyledButton>
                )}
                {orders.length > 0 && (
                  <Indicator
                    // color={theme.colors.blue[6]}
                    color={theme.colors.yellow[8]}
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

            {width < 768 && (
              <Group mt={10}>
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
          {/* <Group position="center">
            <Tabs
              mt={width < 768 ? 10 : 5}
              variant="pills"
              value={tabValue}
              color="yellow.8"
              sx={{
                [".mantine-Tabs-tab"]: {
                  color: "white",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: theme.colors.yellow[8],
                    // color: theme.colors.dark[8],
                  },
                },
              }}
              onTabChange={(value) => navigate(`/${value}`)}>
              <Tabs.List position="center">
                <Tabs.Tab value="products">Products</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Group> */}
        </Flex>
      </Header>
    </Box>
  );
}

export default HomeHeader;
