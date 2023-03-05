import React, { useContext, useState } from "react";
import SearchBar from "../../../components/search/Index";
import { DashboardTable } from "../../../components/table/Index";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { AuthContext } from "../../../contexts/Index";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user, signOut, data } = useContext(AuthContext);
  const navigate = useNavigate();
  const titles = ["Name", "Description", "Price", "Quantity"];

  const navigateToCreate = async () => {
    navigate("/admin/products/create");
  };

  console.log("dashboard", data);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}>
          <SearchBar placeholder="Search" />

          <p>Products</p>
          <p>Category</p>
          <p>Orders</p>
          <Button mt={500} onClick={signOut}>
            Logout
          </Button>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}>
            <Text>Dashboard</Text>
            <Button onClick={navigateToCreate}>Create</Button>
          </div>
        </Header>
      }>
      {/* <Text>Resize app to see responsive navbar in action</Text> */}
      <DashboardTable data={data} titles={titles} />
    </AppShell>
  );
}
