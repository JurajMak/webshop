import {
  createStyles,
  Title,
  Container,
  Text,
  UnstyledButton,
  Overlay,
  SimpleGrid,
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
      <div className={classes.header}>
        <Title className={classes.title}>Frequently Asked Questions</Title>
        <Title className={classes.titleOverlay} role="presentation">
          FAQ
        </Title>

        <div className={classes.contact}>
          <Text size="xl" weight={500} className={classes.contactTitle}>
            Contact us
          </Text>

          <ContactIconsList />
        </div>
      </div>

      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {items}
      </SimpleGrid>
    </Container>
  );
}
