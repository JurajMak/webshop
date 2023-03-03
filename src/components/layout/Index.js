import {
  AppShell,
  Navbar,
  Footer,
  Text,
  useMantineTheme,
  Checkbox,
} from "@mantine/core";
import ProductsCard from "../productCard/Index";
import HeaderTabs from "../header/Index";
import { Wrapper, ProductsWrapper } from "../../pages/home/Styles";

import { AuthContext } from "../../contexts/Index";
import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../search/Index";

export default function AppShellLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data } = React.useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [shoppingData, setShoppingData] = useState([]);
  const [checkedSize, setCheckedSize] = useState(false);
  const [checkedName, setCheckedName] = useState(false);
  const [checkedPrice, setCheckedPrice] = useState(false);

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

  const checked = () => {
    setCheckedSize(!checkedSize);
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
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Search</Text>
          <SearchBar
            placeholder="Search products"
            onChange={(e) => setSearch(e.target.value)}
            // onClick={handleSearch}
            value={search}
          ></SearchBar>
          <Checkbox.Group
            orientation="vertical"
            offset="md"
            size="md"
            spacing={70}
            mt={70}
            ml={30}
          >
            <Checkbox
              value="category"
              label="Size"
              checked={checkedSize}
              onClick={() => setCheckedSize(!checkedSize)}
            />
            <Checkbox
              value="category2"
              label="Price"
              checked={checkedPrice}
              onClick={() => setCheckedPrice(!checkedPrice)}
            />
            <Checkbox
              value="category3"
              label="Name"
              checked={checkedName}
              onClick={() => setCheckedName(!checkedName)}
            />
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
        {data
          ?.filter((item) => {
            if (search === "") {
              return item;
            }
            if (item.title.toLowerCase().includes(search.toLowerCase())) {
              return item;
            }
            if (search == item.price && checkedPrice) {
              return item;
            }
            if (search.toUpperCase() == item.availableSizes && checkedSize) {
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

// ?.filter((item) => {
//   if (search === "") {
//     return item;
//   }
//   if (item.title.toLowerCase().includes(search.toLowerCase())) {
//     return item;
//   }
//   if (search == item.price && checkedPrice) {
//     return item;
//   }
//   if (search.toUpperCase() == item.availableSizes && checkedSize) {
//     return item;
//   }
// })
