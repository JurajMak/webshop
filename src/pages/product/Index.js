import {
  Box,
  Container,
  Flex,
  LoadingOverlay,
  Stack,
  Title,
  Text,
  Group,
  Button,
  Image,
  Badge,
  Accordion,
} from "@mantine/core";
import React, { useEffect, useReducer } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getProductById } from "../../api/products";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartReducer } from "../../utils/cartReducer";
import HeaderTabs from "../../components/header/Index";
import { percentageCalc } from "../../utils/calcs";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shoppingData, dispatch] = useReducer(CartReducer, []);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(id),
  });

  const handleAddCart = (item) => {
    const payload = { item };
    dispatch({ type: "ADD_TO_CART", payload });
  };

  useEffect(() => {
    dispatch({ type: "LOAD_CART_FROM_STORAGE" });
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingOverlay
          loaderProps={{ size: "xl", color: "#2524D1", variant: "oval" }}
          overlayOpacity={0.3}
          overlayColor="#c5c5c5"
          visible
        />
      ) : (
        isSuccess && (
          <>
            <HeaderTabs
              orders={shoppingData}
              // onRemove={handleRemoveQuantity}
              // onDelete={handleDeleteItem}
            />
            <Box>
              <Container size="xl" mt={20}>
                <Flex mb={40} align="center">
                  <Title order={1}>{data?.name}</Title>
                  {data.is_sale && (
                    <Badge ml={50} variant="filled" color="red" size="lg">
                      {percentageCalc(data.price, data.sale_price)}% off
                    </Badge>
                  )}
                </Flex>
                <Stack pb={100}>
                  <Flex justify="space-evenly">
                    <Image src={data.image} maw={500} alt="Random image" />
                    <Flex direction="column" gap={20}>
                      {/* <Text color="dimmed" weight={500} size="xl">
                        Quantity: {data?.quantity}
                      </Text> */}
                      <Button color="dark" onClick={() => handleAddCart(data)}>
                        Add to cart
                      </Button>
                    </Flex>
                  </Flex>
                </Stack>
              </Container>
            </Box>

            <Container size="xl">
              <Accordion
                sx={{
                  [".mantine-Accordion-label"]: {
                    fontWeight: 700,
                    fontSize: 20,
                  },
                }}
                multiple
                defaultValue={["description"]}>
                <Accordion.Item value="description">
                  <Accordion.Control>Description</Accordion.Control>
                  <Accordion.Panel>{data.description}</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="flexibility">
                  <Accordion.Control>Flexibility</Accordion.Control>
                  <Accordion.Panel>
                    Configure components appearance and behavior with vast
                    amount of settings or overwrite any part of component styles
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="focus-ring">
                  <Accordion.Control>No annoying focus ring</Accordion.Control>
                  <Accordion.Panel>
                    With new :focus-visible pseudo-class focus ring appears only
                    when user navigates with keyboard
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>

              <Flex mt={50} justify="space-between">
                <Button color="dark" radius={6} onClick={() => navigate("/")}>
                  Return
                </Button>
              </Flex>
            </Container>
          </>
        )
      )}
    </>
  );
}
