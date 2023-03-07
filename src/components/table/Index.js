import {
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  Pagination,
} from "@mantine/core";

import { IconPencil, IconTrash } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/Supabase";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/Index";

export function DashboardTable({ titles, search, isSearching }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { data, getData, getCategory } = useContext(AuthContext);
  const [activePage, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(13);

  const lastPost = activePage * itemsPerPage;
  const firstPost = lastPost - itemsPerPage;
  const currentPost = data?.slice(firstPost, lastPost);
  const searchPost = search?.slice(firstPost, lastPost);

  const toEdit = async (item) => {
    console.log("item Edit", item.id);
    navigate(`/admin/products/${item.id}`, { state: item });
  };

  const handleClick = (e, item) => {
    console.log("item Delete", item.id);
  };

  const handleDeleteProduct = async (id) => {
    const { error } = await supabase.from("products").delete().eq(`id`, id);
    getData();
  };

  React.useEffect(() => {
    getData();
  }, []);

  console.log("table", isSearching);

  return (
    <ScrollArea>
      <Pagination
        m="auto"
        withEdges
        value={activePage}
        onChange={setPage}
        total={Math.round(data.length / 10)}
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
          {isSearching
            ? searchPost?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Group spacing="sm">
                      <Text fz="sm" fw={500}>
                        {item.name}
                      </Text>
                    </Group>
                  </td>

                  <td>
                    <Badge
                      variant={
                        theme.colorScheme === "dark" ? "light" : "outline"
                      }>
                      {item.description}
                    </Badge>
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
                      {item.sale_price}
                    </Text>
                  </td>
                  <td>
                    <Group spacing={0} position="right">
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
            : currentPost?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Group spacing="sm">
                      <Text fz="sm" fw={500}>
                        {item.name}
                      </Text>
                    </Group>
                  </td>

                  <td>
                    <Badge
                      variant={
                        theme.colorScheme === "dark" ? "light" : "outline"
                      }>
                      {item.description}
                    </Badge>
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
                      {item.sale_price}
                    </Text>
                  </td>
                  <td>
                    <Group spacing={0} position="right">
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
              ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
}

// {currentPost?.map((item) => (
//   <tr key={item.id}>
//     <td>
//       <Group spacing="sm">
//         <Text fz="sm" fw={500}>
//           {item.name}
//         </Text>
//       </Group>
//     </td>

//     <td>
//       <Badge
//         variant={theme.colorScheme === "dark" ? "light" : "outline"}>
//         {item.description}
//       </Badge>
//     </td>
//     <td>
//       <Text fz="sm" c="blue">
//         $ {item.price}
//       </Text>
//     </td>
//     <td>
//       <Text fz="sm">{item.quantity}</Text>
//     </td>
//     <td>
//       <Text fz="sm" c="blue">
//         {item.sale_price}
//       </Text>
//     </td>
//     <td>
//       <Group spacing={0} position="right">
//         <ActionIcon onClick={() => toEdit(item)}>
//           <IconPencil size="1rem" stroke={1.5} />
//         </ActionIcon>
//         <ActionIcon
//           color="red"
//           onClick={() => handleDeleteProduct(item.id)}>
//           <IconTrash size="1rem" stroke={1.5} />
//         </ActionIcon>
//       </Group>
//     </td>
//   </tr>
// ))}

// const rows = currentPost?.map((item) => (
//   <tr key={item.id}>
//     <td>
//       <Group spacing="sm">
//         <Text fz="sm" fw={500}>
//           {item.name}
//         </Text>
//       </Group>
//     </td>

//     <td>
//       <Badge variant={theme.colorScheme === "dark" ? "light" : "outline"}>
//         {item.description}
//       </Badge>
//     </td>
//     <td>
//       <Text fz="sm" c="blue">
//         $ {item.price}
//       </Text>
//     </td>
//     <td>
//       <Text fz="sm">{item.quantity}</Text>
//     </td>
//     <td>
//       <Text fz="sm" c="blue">
//         {item.sale_price}
//       </Text>
//     </td>
//     <td>
//       <Group spacing={0} position="right">
//         <ActionIcon onClick={() => toEdit(item)}>
//           <IconPencil size="1rem" stroke={1.5} />
//         </ActionIcon>
//         <ActionIcon color="red" onClick={() => handleDeleteProduct(item.id)}>
//           <IconTrash size="1rem" stroke={1.5} />
//         </ActionIcon>
//       </Group>
//     </td>
//   </tr>
// ));
