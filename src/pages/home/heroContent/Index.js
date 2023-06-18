import { Container, Title, Text, Box } from "@mantine/core";
import { useStyles } from "./Styles";
import { Faq } from "../../../components/faq/Index";
import { Features } from "../../../components/features/Index";
import { HomeCarousel } from "../../../components/carousel/Index";

import { useViewportSize } from "@mantine/hooks";

export function HeroImageRight() {
  const { classes } = useStyles();

  const { width } = useViewportSize();

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.inner}>
          <Box className={classes.content}>
            <Title className={classes.title}>
              Your{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "pink", to: "yellow" }}>
                Shopping Destination,
              </Text>{" "}
              Elevated.
            </Title>

            <Text className={classes.description} mt={70} m="auto">
              We understand the value of your time and strive to make your
              shopping experience effortless and efficient. With our
              user-friendly interface, intuitive search functionality, and
              seamless checkout process, you can navigate through our store with
              ease. Enjoy the convenience of shopping from the comfort of your
              own home, whenever and wherever it suits you.
            </Text>
          </Box>
        </Box>
      </Container>
      <Features />
      <HomeCarousel />
      <Faq />
    </Box>
  );
}
