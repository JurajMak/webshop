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
  Select,
} from "@mantine/core";
import { AuthContext } from "../../../contexts/Index";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user, signOut, data, categories } = useContext(AuthContext);
  const navigate = useNavigate();
  const titles = ["Name", "Description", "Price", "Quantity", "Sale price"];

  const navigateToCreate = async () => {
    navigate("/admin/products/create");
  };

  console.log("dashboard", categories);

  // const categoryData = categories?.map((item) => ({
  //   id: item.id,
  //   name: item.name,
  // }));

  // const handleCategoryChange = (value) => {
  //   const selectedCategory = categories.find(
  //     (category) => category.id === value
  //   );
  //   console.log(selectedCategory);
  // };

  const handleClick = (id) => {
    console.log(id);
  };

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
          <p>Orders</p>
          <p>Category</p>
          <Select
            placeholder="Categories"
            value={categories}
            data={categories}
            onChange={(e) => handleClick(categories.id)}
          />

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
            <Text>Admin: {user.user_metadata.full_name}</Text>
            <Button onClick={navigateToCreate}>Create</Button>
          </div>
        </Header>
      }>
      <DashboardTable titles={titles} />
    </AppShell>
  );
}
