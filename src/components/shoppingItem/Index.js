import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
} from "@mantine/core";
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
  IconShirt,
} from "@tabler/icons";
import React, { useState, useEffect } from "react";
import { Wrapper } from "./Styled";

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

  console.log(props);

  return (
    <Wrapper>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
        </Card.Section>

        <Group position="apart" mt="md">
          <div>
            <Text weight={500}>{}</Text>
            <Text size="xs" color="dimmed">
              {/* {title} */}
              Product
            </Text>
          </div>
          <Badge variant="outline">25% off</Badge>
        </Group>

        <Card.Section className={classes.section} mt="md">
          <Text fz="xs" color="dimmed" className={classes.label}>
            Quantity:
            {/* {quantity} */}
          </Text>

          <Group spacing={8} mb={-8}>
            <IconShirt size={15} />
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Group spacing={30}>
            <div>
              <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                $ 100
                {/* {price * quantity} */}
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
    </Wrapper>
  );
};

export default ShoppingItem;
