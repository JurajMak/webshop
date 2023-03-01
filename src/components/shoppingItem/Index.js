import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  UnstyledButton,
} from "@mantine/core";
import {
  IconShirt,
  IconSquarePlus,
  IconSquareMinus,
  IconX,
} from "@tabler/icons";
import React, { useState, useEffect } from "react";
import {
  Wrapper,
  DivReducer,
  ButtonWrapper,
  Transparent,
  ImageWrapper,
  CardWrapper,
} from "./Styled";

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

const ShoppingItem = (props) => {
  const { classes } = useStyles();
  // const { title, price, style, quantity, id, availableSizes } = data;
  // console.log("shpITm", data);
  const { title, price, style, quantity, id, availableSizes } = props.data;

  return (
    <CardWrapper>
      <DivReducer>
        <Card withBorder radius="md" className={classes.card}>
          <Card.Section className={classes.imageSection}>
            <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
          </Card.Section>

          <Group position="apart" mt="md">
            <div>
              <Text weight={500}>{}</Text>
              <Text size="xs" color="dimmed">
                {title}
                Product
              </Text>
            </div>
            <Badge variant="outline">25% off</Badge>
          </Group>

          <Card.Section className={classes.section} mt="md">
            <Text fz="xs" color="dimmed" className={classes.label}>
              Quantity: {quantity}
            </Text>

            <Group spacing={8} mb={-8}>
              <IconShirt size={15} />
              {availableSizes.join("/")}
            </Group>
          </Card.Section>

          <Card.Section className={classes.section}>
            <Group spacing={30}>
              <div>
                <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                  $ {price * quantity.toFixed(2)}
                </Text>
                <Text
                  size="sm"
                  color="dimmed"
                  weight={500}
                  sx={{ lineHeight: 1 }}
                  mt={3}
                ></Text>
              </div>
            </Group>
          </Card.Section>
        </Card>
      </DivReducer>
      <ButtonWrapper>
        <UnstyledButton onClick={(e) => props.onDelete(e, props.data.id)}>
          <IconX size={30} />
        </UnstyledButton>
        <UnstyledButton onClick={(e) => props.onQuantity(e, props.data)}>
          <IconSquarePlus size={30} />
        </UnstyledButton>
        <UnstyledButton onClick={(e) => props.onRemove(e, props.data)}>
          <IconSquareMinus size={30} />
        </UnstyledButton>
      </ButtonWrapper>
    </CardWrapper>
  );
};

export default ShoppingItem;
