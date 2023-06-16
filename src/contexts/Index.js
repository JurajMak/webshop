import React, { createContext, useState } from "react";
import { supabase } from "../config/Supabase";
import { LoadingOverlay } from "@mantine/core";
import {
  warningUserLoginNotification,
  warningUserSignUpNotification,
} from "../components/notifications/warningNotification";
import { handleSuccessLogoutNotification } from "../components/notifications/successNotification";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      warningUserLoginNotification(error.message);
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
      warningUserSignUpNotification(error.message);
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
      handleSuccessLogoutNotification(user.user_metadata.full_name);
    }
  };

  const value = {
    signIn,
    signUp,
    signOut,
    user,
    setUser,
    isLoading,
  };

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data && data.session) {
        setUser(data.session.user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setIsLoading(false);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? (
        children
      ) : (
        <LoadingOverlay
          visible={isLoading}
          overlayBlur={2}
          loaderProps={{ size: "xl", color: "gray" }}
        />
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
