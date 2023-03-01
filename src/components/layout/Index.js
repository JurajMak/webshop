import {
  AppShell,
  Navbar,
  Footer,
  Text,
  useMantineTheme,
  TextInput,
  Input,
} from "@mantine/core";
import ProductsCard from "../productCard/Index";
import HeaderTabs from "../header/Index";
import { Wrapper, ProductsWrapper } from "../../pages/home/Styles";

import { AuthContext } from "../../contexts/Index";
import React, { useState, useEffect, useContext } from "react";
import InputWithButton from "../search/Index";

export default function AppShellLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data } = React.useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [shoppingData, setShoppingData] = useState([]);

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

  console.log(shoppingData);
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
          <Text>Search</Text>
          <InputWithButton
            onChange={(e) => setSearch(e.target.value)}
            value={search}></InputWithButton>
          {data
            .filter((item) => {
              if (search === "") {
                return "";
              } else if (
                item.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item, index) => (
              <div key={index}>
                <p>
                  {item.title}, ${item.price}.
                </p>
              </div>
            ))}
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
      }>
      <Wrapper>
        {data
          ?.filter((item) => {
            if (search === "") {
              return item;
            } else if (
              item.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            }
          })
          .map((item) => {
            return (
              <ProductsWrapper key={item.id}>
                <ProductsCard
                  data={item}
                  onClick={(e) => handleAddCart(e, item)}
                />
              </ProductsWrapper>
            );
          })}
      </Wrapper>
    </AppShell>
  );
}
