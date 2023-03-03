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

export function DashboardTable({ data, titles }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const toEdit = async () => {
    navigate(`/admin/products/${data.id}`);
  };

  const deleteProducts = () => {};
  const rows = data.map((item) => (
    <tr key={item.title}>
      <td>
        <Group spacing="sm">
          <Text fz="sm" fw={500}>
            {item.title}
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
          {/* {item.quantity} */}
          10
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon onClick={toEdit}>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red" onClick={deleteProducts}>
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
