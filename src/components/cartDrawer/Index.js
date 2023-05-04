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
import { CartCard } from "../cards/cartCard/Index";
import { sumPrice } from "../../utils/sumCalc";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Index";
import { useViewportSize } from "@mantine/hooks";

export default function CartDrawer({
  orders,
  onRemove,
  onDelete,
  onQuantity,
  handleCheckout,
  loading,
  opened,
  setOpened,
}) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { height, width } = useViewportSize();

  const navigateLogin = async () => {
    navigate("/login");
  };
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      padding="xs"
      size="xl"
      transition="rotate-left"
      transitionDuration={250}
      transitionTimingFunction="ease"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[7]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      sx={{
        // [".mantine-Drawer-drawer"]: { background: theme.colors.dark[0] },
        [".mantine-Drawer-closeButton"]: {
          width: "30px",
          height: "30px",
        },
        ["& .mantine-Drawer-closeButton svg"]: {
          color: "black",
          width: "30px",
          height: "30px",
        },
      }}>
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
              $ {sumPrice(orders)}
            </Text>
          </Group>

          {user?.user_metadata.role === "user" ? (
            <Button
              color="dark"
              miw={250}
              disabled={orders.length <= 0 ? true : false}
              onClick={handleCheckout}
              loading={loading}>
              $ Checkout
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
