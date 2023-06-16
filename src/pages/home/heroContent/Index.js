import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Group,
} from "@mantine/core";
import { useStyles } from "./Styles";
import { Faq } from "../../../components/faq/Index";
import { Features } from "../../../components/features/Index";
import { HomeCarousel } from "../../../components/carousel/Index";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../../components/footer/Index";
import { useViewportSize } from "@mantine/hooks";

export function HeroImageRight() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { width } = useViewportSize();
  // "Your Shopping Destination, Elevated."
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
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
          </div>
        </div>
      </Container>
      <Features />
      <HomeCarousel />
      <Faq />
      <div className={classes.footer} style={{ minWidth: width * 0.95 }}>
        <Footer />
      </div>
    </div>
  );
}
