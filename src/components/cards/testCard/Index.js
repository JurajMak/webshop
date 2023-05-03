import { IconEye, IconMessageCircle } from "@tabler/icons";
import {
  Card,
  Text,
  Group,
  Center,
  createStyles,
  Badge,
  Image,
  Button,
} from "@mantine/core";
import test from "../../../assets/register.jpg";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    height: 300,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    // [`&:hover`]: {
    //   transform: "scale(1.03)",
    // },
  },

  image: {
    ...theme.fn.cover(),
    backgroundSize: "cover",
    transition: "transform 500ms ease",
  },

  overlay: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
  },

  content: {
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 1,
  },

  title: {
    color: theme.white,
    marginBottom: 5,
  },

  bodyText: {
    color: theme.colors.dark[2],
    // marginLeft: 20,
  },

  author: {
    color: theme.colors.dark[2],
  },
  rating: {
    position: "absolute",
    top: 10,
    left: 10,
    pointerEvents: "none",
  },
  btn: {
    position: "absolute",
    top: -10,
    right: -10,
  },
}));

export function TestCard({ data, onClick }) {
  const { classes, theme } = useStyles();
  const { name, price, description, quantity, sale_price, is_sale, image } =
    data;

  return (
    <Card
      miw={300}
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      target="_blank">
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
          {Math.round(((price - sale_price) / price) * 100)}% off
        </Badge>
      )}
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="xl" className={classes.title} weight={500}>
            {name}
          </Text>
          <Group spacing={30}>
            <div>
              {is_sale ? (
                <div>
                  <Text
                    td="line-through"
                    color="gray"
                    size="sm"
                    weight={500}
                    sx={{ lineHeight: 1 }}
                    mb={5}>
                    ${price}
                  </Text>
                  <Text
                    size="xl"
                    color="red"
                    weight={500}
                    sx={{ lineHeight: 1 }}>
                    ${sale_price}
                  </Text>{" "}
                </div>
              ) : (
                <div>
                  <Text
                    size="xl"
                    color="gray"
                    weight={500}
                    sx={{ lineHeight: 1 }}>
                    ${price}
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
                style={{ flex: 1 }}
                onClick={onClick}>
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

            <Group spacing="lg">
              <Center>
                <Text size="sm" className={classes.bodyText} lineClamp={1}>
                  {description}
                </Text>
                <IconMessageCircle
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
