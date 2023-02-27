import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = () => {
  return <AuthContext.Provider></AuthContext.Provider>;
};

export default AuthProvider;
