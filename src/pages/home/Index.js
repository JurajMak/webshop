import React, { useEffect, useReducer } from "react";
import HeaderTabs from "../../components/header/Index";
import { CartReducer } from "../../utils/cartReducer";
import { HomeCarousel } from "../../components/carousel/Index";
import { Box } from "@mantine/core";
// import HomeHeader from "../../components/homeHeader/Index";

const Home = () => {
  const [shoppingData, dispatch] = useReducer(CartReducer, []);

  useEffect(() => {
    dispatch({ type: "LOAD_CART_FROM_STORAGE" });
  }, []);

  return (
    <Box>
      <HeaderTabs orders={shoppingData} />
      <HomeCarousel />
    </Box>
  );
};

export default Home;
