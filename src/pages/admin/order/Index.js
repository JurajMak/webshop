import { Table, Group, Text, ScrollArea, LoadingOverlay } from "@mantine/core";
import { supabase } from "../../../config/Supabase";
import React, { useState } from "react";
import { LoaderWrapper } from "./Styles";

export function OrderTable({ titles }) {
  const [ordersForRender, setOrdersForRender] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("orders").select(
      `
        *,
        order_products(
          product_id,
          products:products(name),
          user_id,
          profiles:profiles(full_name),
          order_id,
          orders:orders(total)
        )
      `
    );

    if (error) {
      console.log("nevalja", error.message);
      return;
    }

    setOrdersForRender(
      data.flatMap((order) => ({
        id: order.id,
        profile_name: order?.order_products[0]?.profiles?.full_name,
        total: order.total,
      }))
    );
    setLoading(false);
  };

  React.useEffect(() => {
    handleGetOrders();
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
                  overlayBlur={2}
                  loaderProps={{ size: "xl" }}
                />
              </LoaderWrapper>
            </tr>
          ) : (
            ordersForRender?.map((item, index) => (
              <tr key={index}>
                <td>
                  <Group spacing="xs">
                    <Text fz="sm" fw={500}>
                      {item.id}
                    </Text>
                  </Group>
                </td>

                <td>
                  <Text fz="sm" c="blue">
                    $ {item.total}
                  </Text>
                </td>
                <td>
                  <Text fz="sm"> {item.profile_name}</Text>
                </td>
                <td>
                  <Text fz="sm" c="blue">
                    {item.sale_price}
                  </Text>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
