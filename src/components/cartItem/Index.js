import {
  createStyles,
  Card,
  Image,
  Text,
  Group,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { IconSquarePlus, IconSquareMinus, IconX } from "@tabler/icons";
import home from "../../assets/login.jpg";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export function CartItem({ cartData, onQuantity, onDelete, onRemove }) {
  const { classes } = useStyles();
  const { name, price, description, quantity, sale_price, is_sale, image } =
    cartData;
  const total = price * quantity;
  const sale = sale_price * quantity;
  return (
    <Card withBorder radius="md" p={0} m={10} className={classes.card}>
      <Group noWrap spacing={0}>
        <Image src={image ? image : home} height={140} width={140} />
        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            Quanity: {quantity}
          </Text>
          <Group mx="auto">
            <Text className={classes.title} mt="xs" mb="md" size={20}>
              {name}
            </Text>
            {is_sale && (
              <Badge variant="outline" size="lg" mx="auto">
                {Math.floor(((price - sale_price) / price) * 100)}% off
              </Badge>
            )}
          </Group>
          <Group noWrap spacing="xs">
            {/* <Group spacing="xs" noWrap>
              <Text size="xs"> Quanity: {quantity}</Text>
            </Group> */}
            <Text size="xs" color="dark">
              • {description}
            </Text>

            <Group ml="auto">
              <div>
                {is_sale ? (
                  <div>
                    <Text
                      td="line-through"
                      size="sm"
                      weight={700}
                      sx={{ lineHeight: 1 }}>
                      ${total.toFixed(2)}
                    </Text>
                    <Text
                      size="xl"
                      color="red"
                      weight={700}
                      sx={{ lineHeight: 1 }}>
                      ${sale.toFixed(2)}
                    </Text>
                  </div>
                ) : (
                  <div>
                    <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                      ${total.toFixed(2)}
                    </Text>
                  </div>
                )}
                <Text
                  size="sm"
                  color="dimmed"
                  weight={500}
                  sx={{ lineHeight: 1 }}
                  mt={3}></Text>
              </div>
            </Group>
          </Group>
        </div>
        <Group
          ml="auto"
          mr={10}
          style={{ display: "flex", flexDirection: "column" }}>
          <ActionIcon onClick={(e) => onDelete(e, cartData.id)}>
            <IconX size={30} />
          </ActionIcon>
          <div style={{ display: "flex" }}>
            <ActionIcon onClick={(e) => onRemove(e, cartData)}>
              <IconSquareMinus size={30} />
            </ActionIcon>
            <ActionIcon onClick={(e) => onQuantity(e, cartData)}>
              <IconSquarePlus size={30} />
            </ActionIcon>
          </div>
        </Group>
      </Group>
    </Card>
  );
}
