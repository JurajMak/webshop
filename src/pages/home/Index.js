import React, { useEffect, useReducer } from "react";
import HeaderTabs from "../../components/header/Index";
import { CartReducer } from "../../utils/cartReducer";

const Home = () => {
  const [shoppingData, dispatch] = useReducer(CartReducer, []);

  useEffect(() => {
    dispatch({ type: "LOAD_CART_FROM_STORAGE" });
  }, []);

  return (
    <>
      <HeaderTabs orders={shoppingData} />
    </>
  );
};

export default Home;
