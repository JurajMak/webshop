import {
  AppShell,
  Navbar,
  Footer,
  Text,
  useMantineTheme,
  Checkbox,
  Group,
  Pagination,
  Title,
} from "@mantine/core";
import ProductsCard from "../productCard/Index";
import HeaderTabs from "../header/Index";
import { Wrapper, ProductsWrapper } from "../../pages/home/Styles";
import { supabase } from "../../config/Supabase";
import { AuthContext } from "../../contexts/Index";
import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../search/Index";

export default function AppShellLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data, setData, categories } = React.useContext(AuthContext);
  const [search, setSearch] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [shoppingData, setShoppingData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activePage, setPage] = useState(1);

  const handleAddCart = (e, item) => {
    const isExists = shoppingData?.some((cart) => {
      return cart.id === item.id;
    });

    if (isExists) {
      setShoppingData(
        shoppingData?.map((cart) => {
          if (cart.id === item.id) {
            const updatedItem = { ...cart, quantity: cart.quantity + 1 };
            localStorage.setItem(
              `shoppingData_${item.id}`,
              JSON.stringify(updatedItem)
            );
            return updatedItem;
          }
          return cart;
        })
      );
    } else {
      const newItem = { ...item, quantity: 1 };
      localStorage.setItem(`shoppingData_${item.id}`, JSON.stringify(newItem));
      setShoppingData([...shoppingData, newItem]);
    }
  };

  const handleRemoveQuantity = (e, item) => {
    const isExists = shoppingData?.some((cart) => {
      return cart.id === item.id;
    });

    if (isExists) {
      return setShoppingData(
        shoppingData?.map((cart) => {
          if (cart.id === item.id && cart.quantity > 1) {
            return { ...cart, quantity: cart.quantity - 1 };
          }
          return cart;
        })
      );
    }
  };

  const handleDeleteItem = (e, id) => {
    setShoppingData(shoppingData?.filter((item) => item.id !== id));
    localStorage.removeItem(`shoppingData_${id}`);
  };

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
  };

  useEffect(() => {
    const savedData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes("shoppingData_")) {
        const item = JSON.parse(localStorage.getItem(key));
        savedData.push(item);
      }
    }

    setShoppingData(savedData);
  }, []);

  console.log("search", shoppingData);

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
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Search</Text>
          <SearchBar
            placeholder="Search products"
            onChange={(e) => handleSearchText(e)}
            onClick={handleSearchButtonClick}
            onKeyDown={(e) => handleSearchEnter(e)}
          ></SearchBar>

          <Checkbox.Group
            orientation="vertical"
            offset="md"
            size="md"
            spacing={30}
            mt={20}
            ml={30}
          >
            <Text>Categories</Text>
            {categories?.map((item) => {
              return (
                <Checkbox key={item.id} value={item.name} label={item.name} />
              );
            })}
          </Checkbox.Group>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <HeaderTabs
          data={shoppingData}
          onDelete={handleDeleteItem}
          onQuantity={handleAddCart}
          onRemove={handleRemoveQuantity}
        />
      }
    >
      <Wrapper>
        {isSearching
          ? search?.map((item) => (
              <ProductsWrapper key={item.id}>
                <ProductsCard
                  data={item}
                  onClick={(e) => handleAddCart(e, item)}
                />
              </ProductsWrapper>
            ))
          : data?.map((item) => (
              <ProductsWrapper key={item.id}>
                <ProductsCard
                  data={item}
                  onClick={(e) => handleAddCart(e, item)}
                />
              </ProductsWrapper>
            ))}
        <Pagination
          mt="auto"
          value={activePage}
          onChange={setPage}
          total={10}
        />
      </Wrapper>
    </AppShell>
  );
}
