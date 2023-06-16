import {
  Card,
  Image,
  Text,
  Group,
  ActionIcon,
  Badge,
  Flex,
} from "@mantine/core";
import { IconSquarePlus, IconSquareMinus, IconX } from "@tabler/icons";
import home from "../../../assets/login.jpg";
import { useStyles } from "./Styles";
import { useViewportSize } from "@mantine/hooks";
import { percentageCalc } from "../../../utils/calcs";

export function CartCard({ cartData, onQuantity, onDelete, onRemove }) {
  const { classes } = useStyles();
  const { height, width } = useViewportSize();
  const { name, price, description, quantity, sale_price, is_sale, image } =
    cartData;
  const total = price * quantity;
  const sale = sale_price * quantity;
  return (
    <Card
      withBorder
      radius="md"
      p={0}
      m={10}
      className={classes.card}
      maw={500}>
      <Group noWrap spacing={0}>
        <Image src={image ? image : home} height={140} width={140} />

        <Flex direction="column" gap={10} ml={20}>
          {is_sale && (
            <Badge color="red" variant="filled" size="lg">
              {percentageCalc(price, sale_price)}% off
            </Badge>
          )}
          <Text
            truncate={1}
            maw={135}
            className={classes.title}
            mr="auto"
            size={18}>
            {name}
          </Text>

          <Group mr="auto">
            <div>
              {is_sale ? (
                <div>
                  <Text
                    td="line-through"
                    size="sm"
                    weight={700}
                    sx={{ lineHeight: 1 }}>
                    {total.toFixed(2)}€
                  </Text>
                  <Text
                    size="lg"
                    color="red"
                    weight={700}
                    sx={{ lineHeight: 1 }}>
                    {sale.toFixed(2)}€
                  </Text>
                </div>
              ) : (
                <div>
                  <Text size="lg" weight={700} sx={{ lineHeight: 1 }}>
                    {total.toFixed(2)}€
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
        </Flex>
        <Group ml="auto" mr={5} style={{ flexDirection: "column" }}>
          <ActionIcon
            className={classes.btn}
            onClick={() => onDelete(cartData.id)}>
            <IconX size={30} />
          </ActionIcon>
          <Group style={width < 500 ? { gap: 0 } : { gap: 10 }}>
            <ActionIcon
              className={classes.btn}
              onClick={() => onRemove(cartData)}>
              <IconSquareMinus size={30} />
            </ActionIcon>
            <Text color="dimmed" weight={500} size="sm">
              {quantity}
            </Text>
            <ActionIcon
              className={classes.btn}
              onClick={() => onQuantity(cartData)}>
              <IconSquarePlus size={30} />
            </ActionIcon>
          </Group>
        </Group>
      </Group>
    </Card>
  );
}
