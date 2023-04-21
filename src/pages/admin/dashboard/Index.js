import React, { useContext, useState } from "react";
import SearchBar from "../../../components/search/Index";
import { ProductsTable } from "../products/Index";
import { OrderTable } from "../order/Index";
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
  const [swapProduct, setSwapProduct] = useState(true);
  const [swapOrder, setSwapOrder] = useState(false);
  const navigate = useNavigate();
  const titles = [
    "Image",
    "Name",
    "Description",
    "Price",
    "Quantity",
    "Sale price",
    "Edit | Delete",
  ];
  const orderTitles = ["Order number", "Checkout Amount", "User name"];

  const navigateToCreate = async () => {
    navigate("/admin/products/create");
  };

  const mappedCategories = categories?.map((item) => item.name);

  const handleSearchText = (e) => {
    setSearchWord(e.target.value);
  };

  const handleSwapProduct = () => {
    setSwapProduct(true);
    setSwapOrder(false);
  };
  const handleSwapOrder = () => {
    setSwapProduct(false);
    setSwapOrder(true);
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
  const handleCategoryEnter = async (e) => {
    if (e.key === "Enter") {
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
    }
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
          <Button
            variant="white"
            radius="xl"
            w={100}
            ml="auto"
            onClick={handleShowAll}>
            Show All
          </Button>

          {/* <Select
            searchable
            clearable
            placeholder="Categories"
            value={value}
            data={mappedCategories}
            onChange={setValue}
            onKeyDown={(e) => handleCategoryEnter(e)}
          /> */}
          {/* <Button
            variant="white"
            radius="xl"
            w={100}
            
            ml="auto"
            onClick={handleSearchButtonClick}>
            Search
          </Button> */}
          <Button
            mt={10}
            ml="auto"
            mr="auto"
            w={150}
            variant="white"
            radius="md"
            size="xl"
            onClick={handleSwapProduct}>
            Products
          </Button>
          <Button
            mb={10}
            variant="white"
            ml="auto"
            mr="auto"
            w={150}
            radius="md"
            size="xl"
            onClick={handleSwapOrder}>
            Orders
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
            <Text>Admin logged in : {user.user_metadata.full_name}</Text>
            <Button onClick={navigateToCreate}>Create</Button>
          </div>
        </Header>
      }>
      {swapProduct ? (
        <ProductsTable
          search={search}
          titles={titles}
          isSearching={isSearching}
        />
      ) : (
        <OrderTable
          search={search}
          isSearching={isSearching}
          titles={orderTitles}
        />
      )}
    </AppShell>
  );
}
