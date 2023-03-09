import {
  AppShell,
  Navbar,
  Footer,
  Text,
  useMantineTheme,
  TextInput,
  Input,
  Button,
  Drawer,
} from "@mantine/core";
import ProductsCard from "../productCard/Index";
import HeaderTabs from "../header/test1";
import ShoppingItem from "../shoppingItem/Index";
import { DrawerWrapper } from "../header/Styles";
// import ProductsCard from "../productCard/test";
// import HeaderTabs from "../header/test";
import { Wrapper, ProductsWrapper } from "../../pages/home/Styles";
import { IconShoppingCart } from "@tabler/icons";
import { AuthContext } from "../../contexts/Index";
import React, { useState, useEffect, useContext } from "react";
import InputWithButton from "../search/Index";

export default function AppShellLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data, user } = React.useContext(AuthContext);
  const [search, setSearch] = useState("");
  const { title, price, style, availableSizes, id } = data;
  const [shoppingData, setShoppingData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const { filterData, setFilterData } = useContext(AuthContext);

  // const handleAddCart = (e, item) => {
  //   const isExists = shoppingData?.some((cart) => {
  //     return cart.id === item.id;
  //   });

  //   if (isExists) {
  //     setShoppingData(
  //       shoppingData?.map((cart) => {
  //         if (cart.id === item.id) {
  //           return { ...cart, quantity: cart.quantity + 1 };
  //         }
  //         return cart;
  //       })
  //     );
  //   } else {
  //     return setShoppingData([...shoppingData, { ...item, quantity: 1 }]);
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
      header={<HeaderTabs data={data} />}>
      <Wrapper>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Shopping Cart"
          padding="xl"
          size="xl">
          {/* Drawer content */}
          <DrawerWrapper>
            {shoppingData?.map((item) => {
              return <ShoppingItem key={item.id} data={item} />;
            })}

            {/* <Button onClick={deleteAll}>Delete</Button> */}
            {user ? <Button>Checkout</Button> : ""}
          </DrawerWrapper>
        </Drawer>
        <Button onClick={() => setOpened(true)}>
          <IconShoppingCart size={25} />
        </Button>
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
          .map((item, index) => {
            return (
              <ProductsWrapper key={index}>
                <ProductsCard
                  key={item}
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

// const handleAddCart = (e, item) => {
//   const isExists = shoppingData?.some((cart) => {
//     return cart.id === item.id;
//   });

//   if (isExists) {
//     setShoppingData(
//       shoppingData?.map((cart) => {
//         if (cart.id === item.id) {
//           const updatedQuantity = cart.quantity + 1;
//           if (updatedQuantity > item.quantity) {
//             alert("Sorry, there are no more items available in stock");
//             return cart;
//           } else {
//             const updatedItem = { ...cart, quantity: updatedQuantity };
//             localStorage.setItem(
//               `shoppingData_${item.id}`,
//               JSON.stringify(updatedItem)
//             );
//             return updatedItem;
//           }
//         }
//         return cart;
//       })
//     );
//   } else {
//     const newItem = { ...item, quantity: 1 };
//     localStorage.setItem(`shoppingData_${item.id}`, JSON.stringify(newItem));
//     setShoppingData([...shoppingData, newItem]);
//   }
// };

// const handleRemoveQuantity = (e, item) => {
//   const isExists = shoppingData?.some((cart) => {
//     return cart.id === item.id;
//   });

//   if (isExists) {
//     return setShoppingData(
//       shoppingData?.map((cart) => {
//         if (cart.id === item.id && cart.quantity > 1) {
//           return { ...cart, quantity: cart.quantity - 1 };
//         }
//         return cart;
//       })
//     );
//   }
// };

// const handleAddQuantity = (e, item) => {
//   const isExists = shoppingData?.some((cart) => {
//     return cart.id === item.id;
//   });

//   if (isExists) {
//     setShoppingData(
//       shoppingData?.map((cart) => {
//         if (cart.id === item.id) {
//           const updatedItem = { ...cart, quantity: cart.quantity + 1 };
//           localStorage.setItem(
//             `shoppingData_${item.id}`,
//             JSON.stringify(updatedItem)
//           );
//           return updatedItem;
//         }
//         return cart;
//       })
//     );
//   } else {
//     const newItem = { ...item, quantity: 1 };
//     localStorage.setItem(`shoppingData_${item.id}`, JSON.stringify(newItem));
//     setShoppingData([...shoppingData, newItem]);
//   }
// };
