import {
  AppShell,
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
  UnstyledButton,
  Box,
} from "@mantine/core";
import { ProductCard } from "../cards/productCard/Index";
import HeaderTabs from "../header/Index";
import React, { useState, useEffect, useReducer } from "react";
import { getProducts } from "../../api/products";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { handleInfiniteScroll } from "../../utils/infiniteScroll";
import { useWindowScroll, useViewportSize } from "@mantine/hooks";
import { getCategory } from "../../api/categories";

import {
  IconArrowUp,
  IconAdjustmentsHorizontal,
  IconChevronDown,
} from "@tabler/icons";
import { FilterDrawer } from "../drawers/filterDrawer/Index";
import { CartReducer } from "../../utils/cartReducer";
import { useNavigate } from "react-router-dom";
import { warningQuantityNotification } from "../notifications/warningNotification";
import { Footer } from "../footer/Index";
import { useStyles } from "./Styles";

export default function AppShellLayout() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectValue, setSelectValue] = useState("popular");
  const [searchWord, setSearchWord] = useState("");
  const [value, setValue] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [shoppingData, dispatch] = useReducer(CartReducer, []);
  const [scroll, scrollTo] = useWindowScroll();
  const { height, width } = useViewportSize();
  const [chipValue, setChipValue] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const { classes } = useStyles();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery(
    ["products"],
    ({ pageParam = 1 }) =>
      getProducts(selectValue, searchWord, pageParam, categoryId, priceRange),

    {
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;
        return lastPage.length !== 0 ? nextPage : null;
      },
    }
  );

  const { data: category } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory(value),
  });

  const handleAddQuantity = (item) => {
    const payload = { item, data };
    const flatten = data?.pages.flatMap((item) => item);
    const dataItem = flatten.find((dataItem) => dataItem.id === item.id);

    if (item.quantity === dataItem.quantity) {
      warningQuantityNotification();
    }
    dispatch({ type: "ADD_QUANTITY", payload });
  };

  const handleRemoveQuantity = (item) => {
    const payload = { item };
    dispatch({ type: "REMOVE_QUANTITY", payload });
  };

  const handleDeleteItem = (id) => {
    const payload = { id };
    dispatch({ type: "DELETE_ITEM", payload });
  };

  const handleDeleteAllCart = () => {
    dispatch({ type: "DELETE_ALL_CART" });
    refetch();
  };
  const handleCategoryClick = (id) => {
    setCategoryId(id);
  };

  const handleSearchText = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      setSearchWord(search);
      // setSwap(false);
    }
  };

  const handleSearchBtn = () => {
    setSearchWord(search);
  };

  const handleProductsDetails = (item) => {
    navigate(`/products/${item.id}`);
  };

  useEffect(() => {
    dispatch({ type: "LOAD_CART_FROM_STORAGE" });
    window.addEventListener("scroll", (e) =>
      handleInfiniteScroll(e, hasNextPage, fetchNextPage, isFetchingNextPage)
    );
    refetch();
    return () => {
      window.removeEventListener("scroll", (e) =>
        handleInfiniteScroll(e, hasNextPage, fetchNextPage, isFetchingNextPage)
      );
    };
  }, [
    selectValue,
    searchWord,
    categoryId,
    priceRange,
    fetchNextPage,
    hasNextPage,
  ]);

  return (
    <AppShell
      className={classes.root}
      footer={<Footer />}
      header={
        <HeaderTabs
          orders={shoppingData}
          category={category}
          onDelete={handleDeleteItem}
          onQuantity={handleAddQuantity}
          onRemove={handleRemoveQuantity}
          onClear={handleDeleteAllCart}
          onText={handleSearchText}
          onEnter={handleSearchEnter}
          onBtn={handleSearchBtn}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />
      }>
      <Group position="center" m={10} mb={20}>
        <UnstyledButton onClick={() => setOpened(!opened)}>
          <Group>
            <IconAdjustmentsHorizontal
              size={25}
              color={theme.colors.yellow[8]}
            />
            <Text color={theme.colors.yellow[8]} fw={500} fz="xl">
              {!opened ? "Show Filter" : "Hide Filter"}
            </Text>
          </Group>
        </UnstyledButton>

        <Select
          styles={{
            rightSection: { pointerEvents: "none" },
          }}
          onChange={(value) => {
            return setSelectValue(value);
          }}
          value={selectValue}
          size="xs"
          data={[
            { label: "Highest price", value: "highest" },
            { label: "Lowest price", value: "lowest" },
            { label: "On sale", value: "sale" },
            { label: "Popular", value: "popular" },
          ]}
          rightSection={<IconChevronDown size="1rem" />}
          rightSectionWidth={30}
        />
      </Group>

      <Group position="center">
        {isLoading ? (
          <LoadingOverlay
            visible={isLoading}
            overlayBlur={6}
            loaderProps={{ size: "xl", color: "gray" }}
            overlayOpacity={0.3}
          />
        ) : (
          data?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group?.map((item) => {
                return (
                  <Group key={item.id} m={5}>
                    <ProductCard
                      data={item}
                      onDetails={() => handleProductsDetails(item)}
                    />
                  </Group>
                );
              })}
            </React.Fragment>
          ))
        )}
      </Group>

      {isFetchingNextPage && hasNextPage && (
        <Flex direction="column" m={20}>
          <Text mx="auto" fz="lg" fw="bold" c="gray.3">
            Loading more products
          </Text>
          <Loader mx="auto" color="gray.4" size={50}></Loader>
        </Flex>
      )}
      {!hasNextPage && (
        <Flex direction="column" mb={20}>
          <Text mx="auto" fz="lg" fw="bold" c="gray.3">
            No more products to load
          </Text>
        </Flex>
      )}
      <FilterDrawer
        priceRange={priceRange}
        onRange={setPriceRange}
        category={category}
        value={chipValue}
        onCategory={handleCategoryClick}
        setValue={setChipValue}
        opened={opened}
        onClose={() => setOpened(!opened)}
      />
      {!cartOpen && (
        <Affix position={{ bottom: height * 0.08, right: width * 0.01 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                color="dark"
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}>
                <IconArrowUp size={20} />
              </Button>
            )}
          </Transition>
        </Affix>
      )}
    </AppShell>
  );
}
