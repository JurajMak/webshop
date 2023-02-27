import React from "react";
import { GlobalStyles, MantineProvider } from "@mantine/core";
import RenderRoutes from "./routes/Index";
import AuthProvider from "./contexts/Index";

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <RenderRoutes />
      </AuthProvider>
    </MantineProvider>
  );
};

export default App;
