import React from "react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import RenderRoutes from "./routes/Index";
import AuthProvider from "./contexts/Index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="top-center" zIndex={2077} limit={1}>
          <AuthProvider>
            <RenderRoutes />
          </AuthProvider>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
