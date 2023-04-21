import React, { createContext, useState } from "react";
import { supabase } from "../config/Supabase";
import { LoadingOverlay } from "@mantine/core";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const { data, error } = await supabase.from("products").select();
    setData(data);
  };

  const getCategory = async () => {
    const { data, error } = await supabase.from("categories").select();
    setCategories(data);
  };

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

  const signUp = async ({ email, password, options }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });
    if (error) {
      alert(error.message);
      return;
    }

    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    } else {
      setUser(null);
      alert(`${user.email} logged out`);
    }
  };

  const value = {
    signIn,
    signUp,
    signOut,
    user,
    setUser,
    data,
    categories,
    getData,
    getCategory,
    isLoading,
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
    getData();
    getCategory();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? (
        children
      ) : (
        <LoadingOverlay
          visible={isLoading}
          overlayBlur={2}
          loaderProps={{ size: "xl" }}
        />
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
