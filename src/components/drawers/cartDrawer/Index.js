import {
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  useMantineTheme,
  Text,
} from "@mantine/core";
import { CartCard } from "../../cards/cartCard/Index";
import { sumTotal } from "../../../utils/sumTotal";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/Index";
import { useViewportSize } from "@mantine/hooks";
import { useStyles } from "./Styles";

export default function CartDrawer({
  orders,
  onRemove,
  onDelete,
  onQuantity,
  handleCheckout,
  loading,
  // opened,
  // setOpened,
  cartOpen,
  setCartOpen,
}) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { height, width } = useViewportSize();

  const navigateLogin = async () => {
    navigate("/login");
  };

  return (
    <Drawer
      className={classes.root}
      // opened={opened}
      // onClose={() => setOpened(false)}
      opened={cartOpen}
      onClose={() => setCartOpen(false)}
      padding="xs"
      size="xl"
      transitionDuration={550}
      transitionTimingFunction="ease"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[7]
      }
      overlayOpacity={0.55}
      overlayBlur={3}>
      <Flex direction="column">
        <ScrollArea type="never" style={{ height: height * 0.7 }}>
          {orders?.map((item) => {
            return (
              <CartCard
                key={item.id}
                cartData={item}
                onRemove={onRemove}
                onQuantity={onQuantity}
                onDelete={onDelete}
              />
            );
          })}
        </ScrollArea>

        <Divider size="md" mb={30} />

        <Flex mx="auto" direction="column" gap={20} align="center">
          <Group>
            <Text fz="lg" fw={500}>
              Total :
            </Text>
            <Text fz="lg" fw={500}>
              {sumTotal(orders)}€
            </Text>
          </Group>

          {user?.user_metadata.role === "user" ? (
            <Button
              color="dark"
              miw={250}
              disabled={orders.length <= 0 ? true : false}
              onClick={handleCheckout}
              loading={loading}>
              Checkout €
            </Button>
          ) : (
            <Button color="dark" miw={250} onClick={navigateLogin}>
              Log in to shop
            </Button>
          )}
        </Flex>
      </Flex>
    </Drawer>
  );
}
