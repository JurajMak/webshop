import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "../config/Supabase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [shoppingData, setShoppingData] = useState([]);

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    return data;
  };

  const signUp = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
      return;
    }

    return data;
  };

  const signInWithGugl = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      alert(error.message);
    }

    return data;
  };

  const value = {
    signIn,
    signUp,
    signInWithGugl,
    user,
    setUser,
    data,
    filterData,
    setFilterData,
  };

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log(data);
      if (data && data.session) {
        setUser(data.session.user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setIsLoading(false);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });
  }, []);
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

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
