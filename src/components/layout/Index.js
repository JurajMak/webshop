import {
  AppShell,
  Navbar,
  Footer,
  Text,
  useMantineTheme,
  Select,
  Button,
  Affix,
  Transition,
  Loader,
  Flex,
  LoadingOverlay,
  Group,
  ActionIcon,
  Accordion,
} from "@mantine/core";
import { TestCard } from "../cards/testCard/Index";
import ProductsCard from "../cards/productCard/Index";
import HeaderTabs from "../header/Index";
import { CategoryCard } from "../cards/categoryCard/Index";
import { ProductsWrapper } from "../../pages/home/Styles";
import React, { useState, useEffect } from "react";
import SearchBar from "../search/Index";
import { warningQuantityNotification } from "../notifications/warningNotification";
import { getProducts } from "../../api/products";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { handleInfiniteScroll } from "../../utils/infiniteScroll";
import { useWindowScroll, useViewportSize } from "@mantine/hooks";
import { getCategory } from "../../api/categories";
import { supabase } from "../../config/Supabase";
import {
  IconArrowUp,
  IconAdjustmentsHorizontal,
  IconChevronDown,
} from "@tabler/icons";

export default function AppShellLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [selectValue, setSelectValue] = useState("popular");
  const [searchWord, setSearchWord] = useState("");
  const [shoppingData, setShoppingData] = useState([]);
  const [value, setValue] = useState("");
  const [scroll, scrollTo] = useWindowScroll();
  const { height, width } = useViewportSize();
  const [swap, setSwap] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  // console.log("swap", swap);
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ["products"],
    ({ pageParam = 1 }) =>
      getProducts(selectValue, searchWord, pageParam, categoryId),
    {
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;
        return lastPage.length !== 0 ? nextPage : null;
      },
    }
  );
  const { data: category, isSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory(value),
  });

  const handleAddCart = (e, item) => {
    const ifExists = shoppingData?.some((cart) => {
      return cart.id === item.id;
    });

    if (ifExists) {
      setShoppingData(
        shoppingData?.map((cart) => {
          if (cart.id === item.id) {
            const updatedQuantity = cart.quantity + 1;
            if (updatedQuantity > item.quantity) {
              warningQuantityNotification();

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
        warningQuantityNotification();

        return;
      }
      localStorage.setItem(`shoppingData_${item.id}`, JSON.stringify(newItem));
      setShoppingData([...shoppingData, newItem]);
    }
  };

  const handleAddQuantity = (e, item) => {
    const dataItem = data?.pages[0].find((dataItem) => dataItem.id === item.id);

    const cartItemIndex = shoppingData.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const cartItem = shoppingData[cartItemIndex];

    if (cartItem && cartItem.quantity >= dataItem.quantity) {
      warningQuantityNotification();
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

  const handleSearchBtn = () => {
    setSearchWord(search);
  };
  const handleShowAll = () => {
    setSearchWord("");
    setValue("");
  };

  const handleSwapProduct = () => {
    setSwap(false);
    setCategoryId("");
  };
  const handleSwapCategory = () => {
    setSwap(true);
  };

  const handleCategoryEnter = async (id) => {
    setCategoryId(id);
    setSwap(false);
    // setCategoryId("");
  };

  console.log("category", categoryId);

  useEffect(() => {
    const savedData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes("shoppingData_")) {
        const item = JSON.parse(localStorage.getItem(key));
        savedData.push(item);
      }
    }

    document.addEventListener("scroll", (e) =>
      handleInfiniteScroll(e, hasNextPage, fetchNextPage)
    );

    setShoppingData(savedData);
    refetch();
    return () => {
      document.removeEventListener("scroll", (e) =>
        handleInfiniteScroll(e, hasNextPage, fetchNextPage)
      );
    };
  }, [selectValue, searchWord, categoryId, fetchNextPage, hasNextPage]);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          overflow: "hidden",
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      // navbar={
      //   <Navbar
      //     p="md"
      //     hiddenBreakpoint="sm"
      //     hidden={!opened}
      //     width={{ sm: 200, lg: 300 }}>
      //     <Group>
      //       <Accordion>
      //         <Accordion.Item value="customization">
      //           <Accordion.Control>Customization</Accordion.Control>
      //           <Accordion.Panel>
      //             Colors, fonts, shadows and many other parts are customizable
      //             to fit your design needs
      //           </Accordion.Panel>
      //         </Accordion.Item>
      //         <Accordion.Item value="flexibility">
      //           <Accordion.Control>Flexibility</Accordion.Control>
      //           <Accordion.Panel>
      //             Configure components appearance and behavior with vast amount
      //             of settings or overwrite any part of component styles
      //           </Accordion.Panel>
      //         </Accordion.Item>

      //         <Accordion.Item value="focus-ring">
      //           <Accordion.Control>No annoying focus ring</Accordion.Control>
      //           <Accordion.Panel>
      //             With new :focus-visible pseudo-class focus ring appears only
      //             when user navigates with keyboard
      //           </Accordion.Panel>
      //         </Accordion.Item>
      //       </Accordion>
      //     </Group>
      //   </Navbar>
      // }
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
          onText={handleSearchText}
          onEnter={handleSearchEnter}
          onBtn={handleSearchBtn}
          onProduct={handleSwapProduct}
          onCategory={handleSwapCategory}
        />
      }>
      <Group position="center" m={10} mt={30}>
        <ActionIcon color={theme.colors.blue[6]} variant="transparent">
          <IconAdjustmentsHorizontal size={25} />
        </ActionIcon>
        <Text color={theme.colors.blue[6]} fw={500} fz="xl">
          Filter
        </Text>

        <Select
          styles={{
            rightSection: { pointerEvents: "none" },
          }}
          onChange={(value) => {
            return setSelectValue(value);
          }}
          value={selectValue}
          clearable
          size="xs"
          data={[
            { label: "Sort from highest price", value: "highest" },
            { label: "Sort from lowest price", value: "lowest" },
            { label: "Sort on sale", value: "sale" },
            { label: "Popular", value: "popular" },
          ]}
          rightSection={<IconChevronDown size="1rem" />}
          rightSectionWidth={30}
        />
      </Group>
      {!swap ? (
        <Group position="center">
          {isLoading ? (
            <LoadingOverlay
              visible={isLoading}
              overlayBlur={6}
              loaderProps={{ size: "xl" }}
            />
          ) : (
            data?.pages?.map((group, i) => (
              <React.Fragment key={i}>
                {group?.map((item) => {
                  return (
                    <Group key={item.id} m={10}>
                      <TestCard
                        data={item}
                        onClick={(e) => handleAddCart(e, item)}
                      />
                    </Group>
                  );
                })}
              </React.Fragment>
            ))
          )}
        </Group>
      ) : (
        <Group position="center">
          {!isSuccess ? (
            <LoadingOverlay
              visible={!isSuccess}
              overlayBlur={6}
              loaderProps={{ size: "xl" }}
            />
          ) : (
            category?.map((item) => {
              return (
                <Group key={item.id} m={10}>
                  <CategoryCard
                    data={item}
                    onClick={(e) => handleCategoryEnter(item.id)}
                  />
                </Group>
              );
            })
          )}
        </Group>
      )}

      {!swap && isFetchingNextPage && hasNextPage && (
        <Flex direction="column">
          <Text mx="auto" fz="lg" fw="bold">
            Loading more products
          </Text>
          <Loader mx="auto" size={50}></Loader>
        </Flex>
      )}
      {/* {!swap && !hasNextPage && (
        <Flex direction="column">
          <Text mx="auto" fz="lg" fw="bold">
            No more products to load
          </Text>
        </Flex>
      )} */}
      <Affix position={{ bottom: height * 0.05, right: width * 0.01 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              color="dark"
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}>
              <IconArrowUp size={20} style={{ marginRight: 5 }} />
              {width > 500 ? "To top" : ""}
            </Button>
          )}
        </Transition>
      </Affix>
    </AppShell>
  );
}
