import React from "react";
import { MantineProvider } from "@mantine/core";
import RenderRoutes from "./routes/Index";

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RenderRoutes />
    </MantineProvider>
  );
};

export default App;
