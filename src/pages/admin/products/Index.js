import {
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  Pagination,
  LoadingOverlay,
  Image,
  Notification,
} from "@mantine/core";

import { IconPencil, IconTrash, IconX } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../config/Supabase";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/Index";
import { LoaderWrapper } from "../order/Styles";
import { ImageWrap } from "./Styles";
import altimg from "../../../assets/login.jpg";

export function ProductsTable({ titles, search, isSearching }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { data, getData, getCategory, user } = useContext(AuthContext);
  const [activePage, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [errorDelete, setErrorDelete] = useState(false);
  const [notValidUser, setNotValidUser] = useState(false);

  const lastPost = activePage * itemsPerPage;
  const firstPost = lastPost - itemsPerPage;
  const currentPost = data?.slice(firstPost, lastPost);
  const searchPost = search?.slice(firstPost, lastPost);

  const toEdit = async (item) => {
    console.log("item Edit", item.id);
    navigate(`/admin/products/${item.id}`, { state: item });
  };

  const handleDeleteProduct = async (id) => {
    if (user.id === data.user_id) {
      const { data: orders, error: err } = await supabase
        .from("order_products")
        .select("order_id")
        .eq("product_id", id);

      if (err) {
        console.error(err.message);
        return;
      }

      if (orders.length > 0) {
        setErrorDelete(true);
        return;
      }

      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        console.log(error.message);
      }
      getData();
    } else {
      setNotValidUser(true);
    }
  };

  React.useEffect(() => {
    getData();
    setLoading(false);
  }, []);
  console.log("prod", data);

  return (
    <ScrollArea>
      {errorDelete && (
        <Notification
          ml="auto"
          mr="auto"
          onClick={() => setErrorDelete(false)}
          icon={<IconX size="1.1rem" />}
          w={380}
          color="red">
          This product is part of an order and cannot be deleted!
        </Notification>
      )}
      {notValidUser && (
        <Notification
          ml="auto"
          mr="auto"
          onClick={() => setNotValidUser(false)}
          icon={<IconX size="1.1rem" />}
          w={380}
          color="red">
          Cannot delete product of other users!
        </Notification>
      )}
      <Pagination
        m="auto"
        withEdges
        value={activePage}
        onChange={setPage}
        total={
          isSearching
            ? Math.ceil(searchPost.length / 10)
            : Math.ceil(data.length / 10)
        }
      />
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            {titles?.map((item, index) => {
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <LoaderWrapper>
                <LoadingOverlay
                  visible={loading}
                  overlayBlur={6}
                  loaderProps={{ size: "xl" }}
                />
              </LoaderWrapper>
            </tr>
          ) : isSearching ? (
            searchPost?.map((item) => (
              <tr key={item.id}>
                <td>
                  <ImageWrap
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
                  <Text fz="sm">{item.description}</Text>
                </td>
                <td>
                  <Text fz="sm" c="blue">
                    $ {item.price}
                  </Text>
                </td>
                <td>
                  <Text fz="sm">{item.quantity}</Text>
                </td>
                <td>
                  <Text fz="sm" c="blue">
                    $ {item.sale_price}
                  </Text>
                </td>
                <td>
                  <Group spacing={0}>
                    <ActionIcon onClick={() => toEdit(item)}>
                      <IconPencil size="1rem" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => handleDeleteProduct(item.id)}>
                      <IconTrash size="1rem" stroke={1.5} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ))
          ) : (
            currentPost?.map((item) => (
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
                      onClick={() => handleDeleteProduct(item.id)}>
                      <IconTrash size="1rem" stroke={1.5} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}

// {loading ? (
//   <tr>
//     <LoaderWrapper>
//       <LoadingOverlay
//         visible={loading}
//         overlayBlur={2}
//         loaderProps={{ size: "xl" }}
//       />
//     </LoaderWrapper>
//   </tr>

// <tbody>
//           {isSearching
//             ? searchPost?.map((item) => (
//                 <tr key={item.id}>
//                   <td>
//                     <Group spacing="sm">
//                       <Text fz="sm" fw={500}>
//                         {item.name}
//                       </Text>
//                     </Group>
//                   </td>

//                   <td>
//                     <Text fz="sm">{item.description}</Text>
//                   </td>
//                   <td>
//                     <Text fz="sm" c="blue">
//                       $ {item.price}
//                     </Text>
//                   </td>
//                   <td>
//                     <Text fz="sm">{item.quantity}</Text>
//                   </td>
//                   <td>
//                     <Text fz="sm" c="blue">
//                       $ {item.sale_price}
//                     </Text>
//                   </td>
//                   <td>
//                     <Group spacing={0}>
//                       <ActionIcon onClick={() => toEdit(item)}>
//                         <IconPencil size="1rem" stroke={1.5} />
//                       </ActionIcon>
//                       <ActionIcon
//                         color="red"
//                         onClick={() => handleDeleteProduct(item.id)}>
//                         <IconTrash size="1rem" stroke={1.5} />
//                       </ActionIcon>
//                     </Group>
//                   </td>
//                 </tr>
//               ))
//             : currentPost?.map((item) => (
//                 <tr key={item.id}>
//                   <td>
//                     <Group spacing="sm">
//                       <Text fz="sm" fw={500}>
//                         {item.name}
//                       </Text>
//                     </Group>
//                   </td>

//                   <td>
//                     <Text fz="sm" fw={500}>
//                       {item.description}
//                     </Text>
//                   </td>
//                   <td>
//                     <Text fz="sm" c="blue" fw={500}>
//                       $ {item.price}
//                     </Text>
//                   </td>
//                   <td>
//                     <Text fz="sm" fw={500}>
//                       {item.quantity}
//                     </Text>
//                   </td>
//                   <td>
//                     <Text fz="sm" c="blue" fw={500}>
//                       $ {item.sale_price}
//                     </Text>
//                   </td>
//                   <td>
//                     <Group>
//                       <ActionIcon onClick={() => toEdit(item)}>
//                         <IconPencil size="1rem" stroke={1.5} />
//                       </ActionIcon>
//                       <ActionIcon
//                         color="red"
//                         onClick={() => handleDeleteProduct(item.id)}>
//                         <IconTrash size="1rem" stroke={1.5} />
//                       </ActionIcon>
//                     </Group>
//                   </td>
//                 </tr>
//               ))}
//         </tbody>
