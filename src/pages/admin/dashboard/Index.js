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
  Box,
} from "@mantine/core";
import { AuthContext } from "../../../contexts/Index";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../config/Supabase";
import UserMenu from "../../../components/userMenu/Index";
import { useViewportSize } from "@mantine/hooks";

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
  const { height, width } = useViewportSize();
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
      // footer={
      //   <Footer height={60} p="md">
      //     Application footer
      //   </Footer>
      // }
      header={
        <Header height={95} p="md" bg="dark.4">
          <Group position="apart">
            <Title color={theme.colors.gray[3]}>Admin panel</Title>
            <Group>
              <SearchBar
                miw={width * 0.3}
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
          <Group position="center">
            <Box>
              <Tabs
                defaultValue="products"
                variant="pills"
                color="yellow.8"
                sx={{
                  [".mantine-Tabs-tab"]: {
                    // color: "black",
                    color: theme.colors.gray[0],
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: theme.colors.yellow[6],
                      color: theme.colors.dark[4],
                    },
                  },
                  // [".mantine-Tabs-panel"]: { color: "white" },
                }}>
                <Tabs.List grow position="center">
                  <Tabs.Tab value="products" onClick={handleSwapProduct}>
                    Products
                  </Tabs.Tab>
                  <Tabs.Tab value="orders" onClick={handleSwapOrder}>
                    Orders
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </Box>
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
