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
  Tabs,
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

  // const handleCategoryEnter = async (e) => {
  //   if (e.key === "Enter") {
  //     const { data: categories } = await supabase
  //       .from("categories")
  //       .select("id")
  //       .ilike("name", `%${value}%`);

  //     const categoryIds = categories.map((category) => category.id);

  //     const { data: productData } = await supabase
  //       .from("products")
  //       .select("*")
  //       .in("category_id", categoryIds);

  //     setSearch(productData);
  //   }
  // };

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
          <Group position="left">
            <Tabs defaultValue="products" orientation="vertical">
              <Tabs.List>
                <Tabs.Tab value="products" onClick={handleSwapProduct}>
                  Products
                </Tabs.Tab>
                <Tabs.Tab value="orders" onClick={handleSwapOrder}>
                  Orders
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="products" pl="xs">
                Products table
              </Tabs.Panel>
              <Tabs.Panel value="orders" pl="xs">
                Orders table
              </Tabs.Panel>
            </Tabs>
          </Group>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={95} p="md">
          <Group position="apart">
            <Title>Admin panel</Title>
            <Group>
              <SearchBar
                // miw={width * 0.3}
                mx="auto"
                size="xs"
                radius="xl"
                pt={10}
                placeholder="Search"
                onChange={(e) => handleSearchText(e)}
                onKeyDown={(e) => handleSearchEnter(e)}
              />
            </Group>
            <Group mr={70}>
              <UserMenu
                onCategory={navigateToCategory}
                onProduct={navigateToCreate}
              />
            </Group>
          </Group>
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
