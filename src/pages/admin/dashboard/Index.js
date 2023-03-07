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
import { supabase } from "../../../config/Supabase";

export default function Dashboard() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user, signOut, data, categories } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();
  const titles = ["Name", "Description", "Price", "Quantity", "Sale price"];

  const navigateToCreate = async () => {
    navigate("/admin/products/create");
  };

  const mappedCategories = categories?.map((item) => item.name);

  const handleSearchText = (e) => {
    setSearchWord(e.target.value);
  };

  const handleSearchEnter = async (e) => {
    if (e.key === "Enter") {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${searchWord}%`);

      if (error) {
        console.error(error);
      } else {
        setSearch(data);
        setIsSearching(true);
      }
    }
  };

  const handleSearchButtonClick = async (e) => {
    const { data: categories } = await supabase
      .from("categories")
      .select("id")
      .ilike("name", `%${value}%`);

    const categoryIds = categories.map((category) => category.id);

    const { data: productData } = await supabase
      .from("products")
      .select("*")
      .in("category_id", categoryIds);

    setSearch(productData);
    setIsSearching(true);
  };

  const handleShowAll = (e) => {
    e.preventDefault();
    setIsSearching(false);
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
          <SearchBar
            placeholder="Search"
            onChange={(e) => handleSearchText(e)}
            onKeyDown={(e) => handleSearchEnter(e)}
          />
          <Button radius="xl" w={100} mt={20} ml="auto" onClick={handleShowAll}>
            Show All
          </Button>
          <p>Orders</p>
          <p>Category</p>
          <Select
            searchable
            clearable
            placeholder="Categories"
            value={value}
            data={mappedCategories}
            onChange={setValue}
          />
          <Button
            radius="xl"
            w={100}
            mt={20}
            ml="auto"
            onClick={handleSearchButtonClick}>
            Search
          </Button>

          <Button mt={400} onClick={signOut}>
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
      <DashboardTable
        search={search}
        titles={titles}
        isSearching={isSearching}
      />
    </AppShell>
  );
}
