import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Button,
} from "@mantine/core";
import { IconShirt } from "@tabler/icons";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/Index";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

export function ProductsCard({ data }) {
  const { classes } = useStyles();
  const { title, price, style, availableSizes, id } = data;
  const [shoppingData, setShoppingData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const handleAddCart = (e, item) => {
    const isExists = shoppingData?.some((cart) => {
      return cart.id === item.id;
    });

    if (isExists) {
      console.log(shoppingData);
      setShoppingData(
        shoppingData?.map((cart) => {
          if (cart.id === item.id) {
            return { ...cart, quantity: cart.quantity + 1 };
          }
          return cart;
        })
      );
    } else {
      return setShoppingData([...shoppingData, { ...item, quantity: 1 }]);
    }
  };

  const storageId = (id) => {
    const isValid = shoppingData?.some((cart) => {
      return cart.id == id;
    });
  };

  useEffect(() => {
    localStorage.setItem(`${id}`, JSON.stringify(shoppingData));
  }, [shoppingData]);

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text weight={500}>{}</Text>
          <Text size="xs" color="dimmed">
            {title}
          </Text>
        </div>
        <Badge variant="outline">25% off</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text size="sm" color="dimmed" className={classes.label}>
          Available sizes
        </Text>

        <Group spacing={8} mb={-8}>
          <IconShirt /> {availableSizes.join("/")}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
              ${price}
            </Text>
            <Text
              size="sm"
              color="dimmed"
              weight={500}
              sx={{ lineHeight: 1 }}
              mt={3}
            ></Text>
          </div>

          <Button
            radius="xl"
            style={{ flex: 1 }}
            onClick={(e) => handleAddCart(e, data)}
          >
            Add to cart
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default ProductsCard;
