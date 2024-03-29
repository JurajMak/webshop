import { IconFileDescription } from "@tabler/icons";
import { Card, Text, Group, Center, Badge, Image, Button } from "@mantine/core";
import test from "../../../assets/register.jpg";
import { useStyles } from "./Styles";
import { percentageCalc } from "../../../utils/calcs";

export function ProductCard({ data, onDetails }) {
  const { classes, theme } = useStyles();
  const { name, price, description, quantity, sale_price, is_sale, image } =
    data;

  return (
    <Card
      miw={250}
      maw={250}
      p="lg"
      shadow="xl"
      className={classes.card}
      radius="md"
      component="a"
      target="_blank"
      onClick={onDetails}>
      <Image
        className={classes.image}
        src={image ? image : test}
        alt="No image to display"
      />
      {is_sale && (
        <Badge
          variant="filled"
          color="red"
          size="lg"
          className={classes.rating}>
          {percentageCalc(price, sale_price)}% off
        </Badge>
      )}
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text truncate size="xl" className={classes.title} weight={500}>
            {name}
          </Text>
          <Group spacing={30}>
            <div>
              {is_sale ? (
                <div>
                  <Text
                    truncate
                    td="line-through"
                    color="gray.5"
                    size="sm"
                    weight={500}
                    sx={{ lineHeight: 1 }}
                    mb={5}>
                    {price.toFixed(2)}€
                  </Text>
                  <Text
                    truncate
                    size="xl"
                    color="red.6"
                    weight={500}
                    sx={{ lineHeight: 1 }}>
                    {sale_price.toFixed(2)}€
                  </Text>
                </div>
              ) : (
                <div>
                  <Text
                    truncate
                    size="xl"
                    color="gray.5"
                    weight={500}
                    sx={{ lineHeight: 1 }}>
                    {price.toFixed(2)}€
                  </Text>
                </div>
              )}
            </div>
            {quantity >= 1 ? (
              <Button
                className={classes.btn}
                color="dark"
                size="xs"
                radius="xl"
                style={{ flex: 1 }}>
                Add to cart
              </Button>
            ) : (
              <Badge
                variant="filled"
                size="lg"
                color="red"
                className={classes.btn}
                p={15}>
                Out of Stock
              </Badge>
            )}
          </Group>

          <Group position="apart" spacing="xs">
            <Text size="sm" className={classes.author}>
              {/* {author} */}
              {/* {description} */}
            </Text>

            <Group spacing="sm">
              <Center>
                <Text
                  truncate={1}
                  maw={100}
                  size="sm"
                  className={classes.bodyText}>
                  {description}
                </Text>
                <IconFileDescription
                  size="1rem"
                  stroke={1.5}
                  color={theme.colors.dark[2]}
                />
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
}
