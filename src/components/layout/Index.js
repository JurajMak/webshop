import {
  AppShell,
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
  UnstyledButton,
} from "@mantine/core";
import { ProductCard } from "../cards/productCard/Index";
import HeaderTabs from "../header/Index";
import { CategoryCard } from "../cards/categoryCard/Index";
import React, { useState, useEffect, useReducer } from "react";
import { warningQuantityNotification } from "../notifications/warningNotification";
import { getProducts } from "../../api/products";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { handleInfiniteScroll } from "../../utils/infiniteScroll";
import { useWindowScroll, useViewportSize } from "@mantine/hooks";
import { getCategory } from "../../api/categories";

import {
  IconArrowUp,
  IconAdjustmentsHorizontal,
  IconChevronDown,
} from "@tabler/icons";
import { FilterDrawer } from "../filterDrawer/Index";
import { CartReducer } from "../../utils/cartReducer";

export default function AppShellLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [selectValue, setSelectValue] = useState("popular");
  const [searchWord, setSearchWord] = useState("");
  const [value, setValue] = useState("");
  const [swap, setSwap] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [shoppingData, dispatch] = useReducer(CartReducer, []);
  const [scroll, scrollTo] = useWindowScroll();
  const { height, width } = useViewportSize();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
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

  const { data: category } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory(value),
  });

  const handleAddCart = (item) => {
    const payload = { item };
    dispatch({ type: "ADD_TO_CART", payload });
  };

  const handleAddQuantity = (item) => {
    const payload = { item, data };
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

  const handleCategoryClick = async (id) => {
    setSwap(false);
    setCategoryId(id);
  };

  const test = data?.pages.flatMap((item) => item);

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
        <UnstyledButton onClick={() => setOpened(!opened)}>
          <Group>
            <IconAdjustmentsHorizontal size={25} color={theme.colors.blue[6]} />
            <Text color={theme.colors.blue[6]} fw={500} fz="xl">
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
          clearable
          // mx="auto"
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
              loaderProps={{ size: "xl", color: "dark" }}
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
                        onClick={() => handleAddCart(item)}
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
          {isLoading || isRefetching ? (
            <LoadingOverlay
              visible={isLoading || isRefetching}
              overlayBlur={6}
              loaderProps={{ size: "xl", color: "dark" }}
            />
          ) : (
            category?.map((item) => {
              return (
                <Group key={item.id} m={5}>
                  <CategoryCard
                    data={item}
                    onClick={(e) => handleCategoryClick(item.id)}
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
          <Loader mx="auto" color="dark" size={50}></Loader>
        </Flex>
      )}
      {!swap && !hasNextPage && (
        <Flex direction="column">
          <Text mx="auto" fz="lg" fw="bold">
            No more products to load
          </Text>
        </Flex>
      )}
      <FilterDrawer opened={opened} onClose={() => setOpened(!opened)} />

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
