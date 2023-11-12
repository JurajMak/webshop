import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { Paper, Text, Title, Button, useMantineTheme } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getProductsImages } from "../../api/products";
import { useStyles } from "./Styles";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
function HomeCard({ image, name, category, id }) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}>
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {name}
        </Title>
      </div>
      <Button color="dark" onClick={() => navigate(`/products/${id}`)}>
        Details
      </Button>
    </Paper>
  );
}

export function HomeCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: 576px)`);
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  console.log(mobile, "sm");

  const { data } = useQuery({
    queryKey: ["productsImages"],
    queryFn: () => getProductsImages(),
  });
  const slides = data?.map((item, i) => (
    <Carousel.Slide key={i}>
      <HomeCard {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      mt={200}
      mb={200}
      withControls={false}
      loop
      slideSize="50%"
      breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
      slideGap="sm"
      align="start"
      slidesToScroll={mobile ? 1 : 2}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}>
      {slides}
    </Carousel>
  );
}
