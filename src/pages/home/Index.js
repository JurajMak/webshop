import React, { useEffect, useReducer } from "react";
import HeaderTabs from "../../components/header/Index";
import { CartReducer } from "../../utils/cartReducer";
import { HomeCarousel } from "../../components/carousel/Index";
import { Box } from "@mantine/core";
import { Features } from "../../components/features/Index";
import { Footer } from "../../components/footer/Index";
import { Faq } from "../../components/faq/Index";
import { HeroImageRight } from "./heroContent/Index";
// #062343 #041428 #000205

// box #062343 #061221
const Home = () => {
  const [shoppingData, dispatch] = useReducer(CartReducer, []);

  useEffect(() => {
    dispatch({ type: "LOAD_CART_FROM_STORAGE" });
  }, []);

  return (
    <Box bg="#062343">
      <HeaderTabs orders={shoppingData} />
      <HeroImageRight />
      {/* <Features />  */}
      {/* <HomeCarousel />

      <Faq />
      <Footer /> */}
    </Box>
  );
};

export default Home;
