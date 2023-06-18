import {
  Title,
  Container,
  Text,
  UnstyledButton,
  Overlay,
  SimpleGrid,
  Box,
} from "@mantine/core";
import { ContactIconsList } from "../contactList/Index";
import { mockFaq } from "./mockFaq";
import { useStyles } from "./Styles";

export function Faq({ categories }) {
  const { classes } = useStyles();

  const items = mockFaq.map((category) => (
    <UnstyledButton
      style={{ backgroundImage: `url(${category.image})` }}
      className={classes.categoryCard}
      key={category.label}>
      <Overlay color="#000" opacity={0.6} zIndex={1} />
      <Text
        size="xl"
        align="center"
        weight={700}
        className={classes.categoryLabel}>
        {category.label}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Container className={classes.wrapper} size="lg">
      <Box className={classes.header}>
        <Title className={classes.title}>Frequently Asked Questions</Title>
        <Title className={classes.titleOverlay} role="presentation">
          FAQ
        </Title>

        <Box className={classes.contact}>
          <Text size="xl" weight={500} className={classes.contactTitle}>
            Contact us
          </Text>

          <ContactIconsList />
        </Box>
      </Box>

      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {items}
      </SimpleGrid>
    </Container>
  );
}
