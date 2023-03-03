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
  ActionIcon,
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
} from "./Styles";

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

const ShoppingItem = ({ data, onQuantity, onDelete, onRemove }) => {
  const { classes } = useStyles();
  const { title, price, style, quantity, id, availableSizes } = data;
  const sum = price * quantity;
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

          <Card.Section className={classes.section} mt="xs">
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
                  $ {sum.toFixed(2)}
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
        <ActionIcon mt={20} ml={40} onClick={(e) => onDelete(e, data.id)}>
          <IconX size={30} />
        </ActionIcon>
        <div style={{ display: "flex" }}>
          <ActionIcon mb={80} onClick={(e) => onRemove(e, data)}>
            <IconSquareMinus size={30} />
          </ActionIcon>
          <ActionIcon mb={80} onClick={(e) => onQuantity(e, data)}>
            <IconSquarePlus size={30} />
          </ActionIcon>
        </div>
      </ButtonWrapper>
    </CardWrapper>
  );
};

export default ShoppingItem;

{
  /* <ButtonWrapper>
<UnstyledButton mt={20} ml={40} onClick={(e) => onDelete(e, data.id)}>
  <IconX size={30} />
</UnstyledButton>
<div>
  <UnstyledButton mb={80} onClick={(e) => onRemove(e, data)}>
    <IconSquareMinus size={30} />
  </UnstyledButton>
  <UnstyledButton mb={80} onClick={(e) => onQuantity(e, data)}>
    <IconSquarePlus size={30} />
  </UnstyledButton>
</div>
</ButtonWrapper> */
}
