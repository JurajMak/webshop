import {
  AppShell,
  Navbar,
  Footer,
  Text,
  useMantineTheme,
  Pagination,
  Select,
  Button,
  Notification,
  Alert,
} from "@mantine/core";
import ProductsCard from "../productCard/Index";
import HeaderTabs from "../header/Index";
import { Wrapper, ProductsWrapper } from "../../pages/home/Styles";
import { supabase } from "../../config/Supabase";
import { AuthContext } from "../../contexts/Index";
import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../search/Index";
import { IconX } from "@tabler/icons";

export default function AppShellLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data, setData, categories, user } = React.useContext(AuthContext);
  const [search, setSearch] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [shoppingData, setShoppingData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activePage, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);

  const lastPost = activePage * itemsPerPage;
  const firstPost = lastPost - itemsPerPage;
  const currentPost = data?.slice(firstPost, lastPost);
  const searchPost = search?.slice(firstPost, lastPost);

  const mappedCategories = categories?.map((item) => item.name);

  const handleAddCart = (e, item) => {
    const isExists = shoppingData?.some((cart) => {
      return cart.id === item.id;
    });

    if (isExists) {
      setShoppingData(
        shoppingData?.map((cart) => {
          if (cart.id === item.id) {
            const updatedQuantity = cart.quantity + 1;
            if (updatedQuantity > item.quantity) {
              setNotify(true);

              return cart;
            }
            const updatedItem = { ...cart, quantity: updatedQuantity };
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
      if (newItem.quantity > item.quantity) {
        setNotify(true);

        return;
      }
      localStorage.setItem(`shoppingData_${item.id}`, JSON.stringify(newItem));
      setShoppingData([...shoppingData, newItem]);
    }
  };

  const handleAddQuantity = (e, item) => {
    const dataItem = data.find((dataItem) => dataItem.id === item.id);

    const cartItemIndex = shoppingData.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const cartItem = shoppingData[cartItemIndex];

    if (cartItem && cartItem.quantity >= dataItem.quantity) {
      setNotify(true);
      return;
    }

    const updatedCartItem = cartItem
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : { ...item, quantity: 1 };

    const updatedShoppingData = [...shoppingData];
    if (cartItemIndex >= 0) {
      updatedShoppingData[cartItemIndex] = updatedCartItem;
    } else {
      updatedShoppingData.push(updatedCartItem);
    }

    localStorage.setItem(
      `shoppingData_${item.id}`,
      JSON.stringify(updatedCartItem)
    );

    setShoppingData(updatedShoppingData);
  };

  const handleRemoveQuantity = (e, item) => {
    const isExists = shoppingData?.some((cart) => {
      return cart.id === item.id;
    });

    if (isExists) {
      return setShoppingData(
        shoppingData?.map((cart) => {
          if (cart.id === item.id && cart.quantity > 1) {
            const updatedItem = { ...cart, quantity: cart.quantity - 1 };
            localStorage.setItem(
              `shoppingData_${item.id}`,
              JSON.stringify(updatedItem)
            );
            return updatedItem;
          } else if (cart.id === item.id && cart.quantity > 1) {
            localStorage.removeItem(`shoppingData_${item.id}`);
          }
          return cart;
        })
      );
    }
  };

  const handleDeleteAllCart = () => {
    for (let key in localStorage) {
      if (key.includes(`shoppingData_`)) {
        localStorage.removeItem(key);
      }
    }
    setShoppingData([]);
  };

  const handleDeleteItem = (e, id) => {
    setShoppingData(shoppingData?.filter((item) => item.id !== id));
    localStorage.removeItem(`shoppingData_${id}`);
  };

  const handleSearchText = (e) => {
    setSearchWord(e.target.value);
  };
  const handleCateogrySearch = (e) => {
    setValue(e.target.value);
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

  const handleShowAll = (e) => {
    e.preventDefault();
    setIsSearching(false);
  };
  const handleNotification = () => {
    setNotify(false);
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
          width={{ sm: 200, lg: 300 }}>
          <Text m={20}>Search</Text>
          <SearchBar
            placeholder="Search products"
            onChange={(e) => handleSearchText(e)}
            onKeyDown={(e) => handleSearchEnter(e)}></SearchBar>
          <Button
            variant="white"
            radius="xl"
            w={100}
            // mt={20}
            ml="auto"
            onClick={handleShowAll}>
            Show All
          </Button>
          <Text m={20}>Category</Text>
          <Select
            radius={50}
            searchable
            clearable
            placeholder="Categories"
            value={value}
            data={mappedCategories}
            onChange={setValue}
            onKeyDown={(e) => handleCategoryEnter(e)}
          />
          <Button
            variant="white"
            radius="xl"
            w={100}
            // mt={20}
            ml="auto"
            onClick={handleSearchButtonClick}>
            Search
          </Button>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <HeaderTabs
          orders={shoppingData}
          onDelete={handleDeleteItem}
          onQuantity={handleAddQuantity}
          onRemove={handleRemoveQuantity}
          onClear={handleDeleteAllCart}
          notify={notify}
          onNotify={handleNotification}
        />
      }>
      {notify && (
        <Notification
          ml={100}
          onClick={handleNotification}
          icon={<IconX size="1.1rem" />}
          w={380}
          color="red">
          Cannot add more of that product to cart remaining quantity is 0
        </Notification>
      )}
      <Wrapper>
        {isSearching
          ? searchPost?.map((item) => (
              <ProductsWrapper key={item.id}>
                <ProductsCard
                  data={item}
                  onClick={(e) => handleAddCart(e, item)}
                />
              </ProductsWrapper>
            ))
          : currentPost?.map((item) => (
              <ProductsWrapper key={item.id}>
                <ProductsCard
                  data={item}
                  onClick={(e) => handleAddCart(e, item)}
                />
              </ProductsWrapper>
            ))}
      </Wrapper>
      <Pagination
        position="center"
        mr={200}
        withEdges
        value={activePage}
        onChange={setPage}
        total={
          isSearching
            ? Math.ceil(searchPost?.length / 10)
            : Math.ceil(data?.length / 10)
        }
      />
    </AppShell>
  );
}
