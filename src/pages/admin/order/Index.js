import { Table, Group, Text, ScrollArea } from "@mantine/core";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../../api/orders";

export function OrderTable({ titles }) {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

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
          {data?.map((item, index) => (
            <tr key={index}>
              <td>
                <Group spacing="xs">
                  <Text fz="sm" fw={500}>
                    {item.order_number}
                  </Text>
                </Group>
              </td>

              <td>
                <Text fz="sm" c="blue">
                  {item.total} €
                </Text>
              </td>
              <td>
                <Text fz="sm" c="dark">
                  {item.profile_name}
                </Text>
              </td>
              {/* <td>
                <Text fz="sm" c="dark">
                  {item.sale_price}
                </Text>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
