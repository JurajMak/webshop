import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [data, setData] = useState([]);

  console.log(data);

  const value = {
    data,
  };
  useEffect(() => {
    axios
      .get(`https://react-shopping-cart-67954.firebaseio.com/products.json`)
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
