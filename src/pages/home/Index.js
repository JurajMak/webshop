import React, { useEffect, useReducer } from "react";
import HeaderTabs from "../../components/header/Index";
import { CartReducer } from "../../utils/cartReducer";

import { Box } from "@mantine/core";

import { Footer } from "../../components/footer/Index";

import { HeroImageRight } from "./heroContent/Index";

const Home = () => {
  const [shoppingData, dispatch] = useReducer(CartReducer, []);

  useEffect(() => {
    dispatch({ type: "LOAD_CART_FROM_STORAGE" });
  }, []);

  return (
    <Box bg="#062343">
      <HeaderTabs orders={shoppingData} />
      <HeroImageRight />
      <Footer />
    </Box>
  );
};

export default Home;
