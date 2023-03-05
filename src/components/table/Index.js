import {
  Avatar,
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

export function DashboardTable({ data, titles, onDelete }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const toEdit = async (id) => {
    navigate(`/admin/products/${data.id}`);
  };

  const handleClick = (e, item) => {
    console.log("item", item);
  };

  console.log("edit", data);

  const deleteProducts = () => {};
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
          <ActionIcon onClick={() => toEdit(data)}>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red" onClick={(e) => handleClick(e, data)}>
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
