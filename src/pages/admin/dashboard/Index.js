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
  Group,
  Flex,
  Title,
} from "@mantine/core";
import { AuthContext } from "../../../contexts/Index";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../config/Supabase";
import UserMenu from "../../../components/userMenu/Index";

export default function Dashboard() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user, signOut, categories } = useContext(AuthContext);
  const [value, setValue] = useState("");
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

  const navigateToCreate = () => {
    navigate("/admin/products/create");
  };
  const navigateToCategory = () => {
    navigate("/admin/products/create/category");
  };

  const handleSearchText = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      setSearchWord(search);
    }
  };

  const handleSwapProduct = () => {
    setSwapProduct(true);
    setSwapOrder(false);
  };
  const handleSwapOrder = () => {
    setSwapProduct(false);
    setSwapOrder(true);
  };

  const handleShowAll = (e) => {
    e.preventDefault();
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

          <Button mt="auto" mb={20} onClick={signOut}>
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
          <Flex align="center" justify="space-between">
            <Title>Dashboard</Title>
            <Group>
              <Button onClick={navigateToCategory}>Add Category</Button>
              <Button onClick={navigateToCreate}>Add product</Button>
            </Group>
            <Group mr={70}>
              <UserMenu />
            </Group>
          </Flex>
        </Header>
      }>
      {swapProduct ? (
        <ProductsTable search={searchWord} titles={titles} />
      ) : (
        <OrderTable search={search} titles={orderTitles} />
      )}
    </AppShell>
  );
}
