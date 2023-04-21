import {
  AppShell,
  Navbar,
  Footer,
  Text,
  useMantineTheme,
  Select,
  Button,
} from "@mantine/core";
import ProductsCard from "../productCard/Index";
import HeaderTabs from "../header/Index";
import { Wrapper, ProductsWrapper } from "../../pages/home/Styles";
import { supabase } from "../../config/Supabase";
import { AuthContext } from "../../contexts/Index";
import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../search/Index";
import { handleQuantityNotification } from "../notifications/warningNotification";
import { getProducts } from "../../api/products";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function AppShellLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user } = React.useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [selectValue, setSelectValue] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [shoppingData, setShoppingData] = useState([]);
  const [value, setValue] = useState("");

  const {
    data,
    isSuccess,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ["products"],
    ({ pageParam = 1 }) => getProducts(selectValue, searchWord, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;
        return lastPage.length !== 0 ? nextPage : null;
      },
    }
  );

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
              handleQuantityNotification();

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
        handleQuantityNotification();

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
      handleQuantityNotification();
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
    refetch();
  };

  const handleDeleteItem = (e, id) => {
    setShoppingData(shoppingData?.filter((item) => item.id !== id));
    localStorage.removeItem(`shoppingData_${id}`);
  };

  const handleSearchText = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      setSearchWord(search);
    }
  };
  const handleShowAll = () => {
    setSearchWord("");
    setValue("");
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
    refetch();
    setShoppingData(savedData);
  }, [selectValue, searchWord]);

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
          <Select
            mx="auto"
            onChange={(value) => {
              return setSelectValue(value);
            }}
            value={selectValue}
            clearable
            size="md"
            placeholder="Sort by"
            data={[
              { label: "Sort from highest price", value: "highest" },
              { label: "Sort from lowest price", value: "lowest" },
              { label: "Sort on sale", value: "sale" },
            ]}
          />

          <Text m={20}>Search</Text>
          <SearchBar
            placeholder="Search products"
            onChange={(e) => handleSearchText(e)}
            onKeyDown={(e) => handleSearchEnter(e)}></SearchBar>
          <Button
            variant="white"
            radius="xl"
            w={100}
            ml="auto"
            onClick={handleShowAll}>
            Show All
          </Button>
          <Text m={20}>Category</Text>
          {/* <Select
            radius={50}
            searchable
            clearable
            placeholder="Categories"
            value={value}
            data={mappedCategories}
            onChange={setValue}
          /> */}
          <Button
            variant="white"
            radius="xl"
            w={100}
            ml="auto"
            // onClick={handleSearchButtonClick}
          >
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
        />
      }>
      <Wrapper>
        {isSuccess &&
          data?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group?.map((item) => {
                return (
                  <ProductsWrapper key={item.id}>
                    <ProductsCard
                      data={item}
                      onClick={(e) => handleAddCart(e, item)}
                    />
                  </ProductsWrapper>
                );
              })}
            </React.Fragment>
          ))}
      </Wrapper>
    </AppShell>
  );
}
