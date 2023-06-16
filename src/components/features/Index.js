import { Text, SimpleGrid, Container, Button, Group } from "@mantine/core";

import { useStyles } from "./Styles";
import { mockFeat } from "./mockFeat";
import { useNavigate } from "react-router-dom";
// #F08C00
// #373A40

function Feature({ icon: Icon, title, description, className, ...others }) {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.feature, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={38} className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} c="dark.5">
          {title}
        </Text>
        <Text c="#B6BCC3" fz="md" mt={20}>
          {description}
        </Text>
      </div>
    </div>
  );
}

export function Features() {
  const items = mockFeat.map((item) => <Feature {...item} key={item.title} />);
  const navigate = useNavigate();
  return (
    <Container mt={30} mb={30} size="lg">
      <Group position="right">
        <Button
          variant="gradient"
          gradient={{ from: "pink", to: "yellow" }}
          size="lg"
          mt={70}
          mb={100}
          onClick={() => navigate("/products")}>
          Explore products
        </Button>
      </Group>
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  );
}
