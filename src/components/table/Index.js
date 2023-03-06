import {
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";

import { IconPencil, IconTrash } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/Supabase";
import React, { useState } from "react";

export function DashboardTable({ titles }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  // const {data, getData } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data, error } = await supabase.from("products").select();
    setData(data);
  };

  const toEdit = async (item) => {
    console.log("item Edit", item.id);
    navigate(`/admin/products/${item.id}`, { state: item });
  };

  const handleClick = (e, item) => {
    console.log("item Delete", item.id);
  };

  const handleDeleteProduct = async (id) => {
    const { error } = await supabase.from("products").delete().eq(`id`, id);
  };

  React.useEffect(() => {
    getData();
  }, [handleDeleteProduct]);

  const rows = data.map((item) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </td>

      <td>
        <Badge variant={theme.colorScheme === "dark" ? "light" : "outline"}>
          {item.description}
        </Badge>
      </td>
      <td>
        <Anchor component="button" size="sm">
          $ {item.price}
        </Anchor>
      </td>
      <td>
        <Text fz="sm" c="dimmed">
          {item.quantity}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon onClick={() => toEdit(item)}>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red" onClick={() => handleDeleteProduct(item.id)}>
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

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
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
