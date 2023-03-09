import {
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  Pagination,
  LoadingOverlay,
} from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { supabase } from "../../../config/Supabase";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/Index";
import { LoaderWrapper } from "./Styles";

export function OrderTable({ titles }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { data, getData, getCategory } = useContext(AuthContext);
  const [activePage, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [ordersInfo, setOrdersInfo] = useState([]);
  const [ordersForRender, setOrdersForRender] = useState([]);
  const [loading, setLoading] = useState(false);

  const lastPost = activePage * itemsPerPage;
  const firstPost = lastPost - itemsPerPage;
  const currentPost = ordersForRender?.slice(firstPost, lastPost);

  // display more info have to uncommet td and add title
  // const handleGetOrders = async () => {
  //   setLoading(true);
  //   const { data, error } = await supabase.from("orders").select(`
  //   *,
  //   order_products(
  //     product_id,
  //     products:products(name),
  //     user_id,
  //     profiles:profiles(full_name),
  //     order_id,
  //     orders:orders(total)
  //   )
  // `);

  //   setOrdersInfo(data);

  //   setOrdersForRender(
  //     data.flatMap((order) =>
  //       order.order_products.map((product) => ({
  //         id: order.id,
  //         product_name: product.products.name,
  //         profile_name: product.profiles.full_name,
  //         total: order.total,
  //       }))
  //     )
  //   );
  //   setLoading(false);
  // };
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
      console.log("Error fetching orders:", error.message);
      return;
    }

    setOrdersForRender(
      data.flatMap((order) => ({
        id: order.id,
        profile_name: order.order_products[0].profiles.full_name,
        total: order.total,
      }))
    );
    setLoading(false);
  };

  React.useEffect(() => {
    handleGetOrders();
  }, []);
  console.log("orders", ordersForRender);
  return (
    <ScrollArea>
      <Pagination
        m="auto"
        withEdges
        value={activePage}
        onChange={setPage}
        total={Math.round(data.length / 15)}
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
                  overlayBlur={2}
                  loaderProps={{ size: "xl" }}
                />
              </LoaderWrapper>
            </tr>
          ) : (
            currentPost?.map((item, index) => (
              <tr key={index}>
                <td>
                  <Group spacing="xs">
                    <Text fz="sm" fw={500}>
                      {item.id}
                    </Text>
                  </Group>
                </td>
                {/* <td>
                  <Group spacing="xs">
                    <Text fz="sm" fw={500}>
                      {item.product_name}
                    </Text>
                  </Group>
                </td> */}

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

// <tbody>
// {loading ? (
//   <LoaderWrapper>
//     <LoadingOverlay
//       visible={loading}
//       overlayBlur={2}
//       loaderProps={{ size: "xl" }}
//     />
//   </LoaderWrapper>
// ) : (
//   currentPost?.map((item, index) => (
//     <tr key={index}>
//       <td>
//         <Group spacing="xs">
//           <Text fz="sm" fw={500}>
//             {item.id}
//           </Text>
//         </Group>
//       </td>
//       {/* <td>
//         <Group spacing="xs">
//           <Text fz="sm" fw={500}>
//             {item.product_name}
//           </Text>
//         </Group>
//       </td> */}

//       <td>
//         <Text fz="sm" c="blue">
//           $ {item.total}
//         </Text>
//       </td>
//       <td>
//         <Text fz="sm"> {item.profile_name}</Text>
//       </td>
//       <td>
//         <Text fz="sm" c="blue">
//           {item.sale_price}
//         </Text>
//       </td>
//     </tr>
//   ))
// )}
// </tbody>
