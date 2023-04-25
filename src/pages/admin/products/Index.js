import {
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  Flex,
  Loader,
} from "@mantine/core";

import { IconPencil, IconTrash } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../config/Supabase";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/Index";
import { ImageWrap } from "./Styles";
import altimg from "../../../assets/login.jpg";
import {
  handleProductNotification,
  handleUserProductNotification,
} from "../../../components/notifications/warningNotification";
import { handleDeleteNotification } from "../../../components/notifications/deleteNotification";
import { getProducts } from "../../../api/products";
import { handleInfiniteScroll } from "../../../utils/infiniteScroll";
import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";

export function ProductsTable({ titles, search }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const queryClient = new QueryClient();
  console.log("search", search);

  const toEdit = async (item) => {
    navigate(`/admin/products/${item.id}`, { state: item });
  };
  const {
    data,
    isSuccess,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ["products"],
    ({ pageParam = 1 }) => getProducts(null, search, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;
        return lastPage.length !== 0 ? nextPage : null;
      },
    }
  );

  const handleDeleteProduct = async (data) => {
    if (user.id === data.user_id) {
      const { data: orders, error: err } = await supabase
        .from("order_products")
        .select("order_id")
        .eq("product_id", data.id);

      if (err) {
        console.error(err.message);
        return;
      }

      if (orders.length > 0) {
        handleProductNotification();
        return;
      }

      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", data.id);
      if (error) {
        console.log(error.message);
      }
      refetch();
    } else {
      handleUserProductNotification();
    }
    handleDeleteNotification(data.name);
  };

  React.useEffect(() => {
    document.addEventListener("scroll", (e) =>
      handleInfiniteScroll(e, hasNextPage, fetchNextPage)
    );
    refetch();
    return () => {
      document.removeEventListener("scroll", (e) =>
        handleInfiniteScroll(e, hasNextPage, fetchNextPage)
      );
    };
  }, [search, fetchNextPage, hasNextPage, refetch]);

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            {titles?.map((item, index) => {
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <ImageWrap
                        fit="cover"
                        src={item.image ? item.image : altimg}
                        alt="No image"></ImageWrap>
                    </td>
                    <td>
                      <Group spacing="sm">
                        <Text fz="sm" fw={500}>
                          {item.name}
                        </Text>
                      </Group>
                    </td>

                    <td>
                      <Text fz="sm" fw={500}>
                        {item.description}
                      </Text>
                    </td>
                    <td>
                      <Text fz="sm" c="blue" fw={500}>
                        $ {item.price}
                      </Text>
                    </td>
                    <td>
                      <Text fz="sm" fw={500}>
                        {item.quantity}
                      </Text>
                    </td>
                    <td>
                      <Text fz="sm" c="blue" fw={500}>
                        $ {item.sale_price}
                      </Text>
                    </td>
                    <td>
                      <Group>
                        <ActionIcon onClick={() => toEdit(item)}>
                          <IconPencil size="1rem" stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon
                          color="red"
                          onClick={() => handleDeleteProduct(item)}>
                          <IconTrash size="1rem" stroke={1.5} />
                        </ActionIcon>
                      </Group>
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      {isFetchingNextPage && hasNextPage && (
        <Flex direction="column">
          <Text mx="auto" fz="lg" fw="bold">
            Loading more products
          </Text>
          <Loader mx="auto" size={50}></Loader>
        </Flex>
      )}
      {!hasNextPage && (
        <Flex direction="column" mx="auto">
          <Text mx="auto" fz="lg" fw="bold">
            No more products to load
          </Text>
        </Flex>
      )}
    </ScrollArea>
  );
}
