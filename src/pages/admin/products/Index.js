import {
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  LoadingOverlay,
  Image,
} from "@mantine/core";

import { IconPencil, IconTrash, IconX } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../config/Supabase";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/Index";
import { LoaderWrapper } from "../order/Styles";
import { ImageWrap } from "./Styles";
import altimg from "../../../assets/login.jpg";
import {
  handleProductNotification,
  handleUserProductNotification,
} from "../../../components/notifications/warningNotification";

export function ProductsTable({ titles, search }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { data, getData, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const toEdit = async (item) => {
    navigate(`/admin/products/${item.id}`, { state: item });
  };

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
      getData();
    } else {
      handleUserProductNotification();
    }
  };

  React.useEffect(() => {
    getData();
    setLoading(false);
  }, []);

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
          ) : (
            data?.map((item) => (
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
            ))
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
