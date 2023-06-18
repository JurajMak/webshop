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
  ActionIcon,
} from "@mantine/core";
import React, { useEffect, useReducer, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../api/products";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartReducer } from "../../utils/cartReducer";
import HeaderTabs from "../../components/header/Index";
import { percentageCalc } from "../../utils/calcs";
import { useViewportSize } from "@mantine/hooks";
import { IconSquareMinus, IconSquarePlus } from "@tabler/icons";
import { warningQuantityNotification } from "../../components/notifications/warningNotification";
import { Footer } from "../../components/footer/Index";
import { useStyles } from "./Styles";
import noImage from "../../assets/register.jpg";

export default function ProductDetails() {
  const { id } = useParams();
  const { width } = useViewportSize();
  const navigate = useNavigate();
  const [shoppingData, dispatch] = useReducer(CartReducer, []);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const { classes } = useStyles();
  const [cartOpen, setCartOpen] = useState(false);

  const {
    data: product,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(id),
    onSuccess: () => {
      dispatch({ type: "LOAD_CART_FROM_STORAGE" });
    },
  });

  const handleRemoveQuantity = () => {
    if (selectedQuantity === 0) {
      return;
    }
    setSelectedQuantity((prev) => prev - 1);
  };
  const handleAddQuantity = () => {
    if (selectedQuantity === product.quantity) {
      warningQuantityNotification();
      return;
    }
    setSelectedQuantity((prev) => prev + 1);
  };

  const handleAddCart = (item) => {
    const payload = { item, selectedQuantity };

    dispatch({ type: "ADD_PRODUCT_TO_CART", payload });
    setSelectedQuantity(0);
  };

  const removeCartQuantity = (item) => {
    const payload = { item };

    dispatch({ type: "REMOVE_QUANTITY", payload });
  };
  const deleteCartItem = (id) => {
    const payload = { id };
    dispatch({ type: "DELETE_ITEM", payload });
  };
  const addCartQuantity = (item) => {
    const payload = { item, product };

    if (item.quantity + 1 >= product.quantity) {
      warningQuantityNotification();
    }
    dispatch({ type: "ADD_QUANTITY_PRODUCT_PAGE", payload });
  };
  const clearCartData = () => {
    dispatch({ type: "DELETE_ALL_CART" });
    refetch();
  };

  return (
    <>
      {isFetching ? (
        <LoadingOverlay
          loaderProps={{ size: "xl", color: "gray", variant: "oval" }}
          overlayOpacity={0.3}
          overlayColor="#c5c5c5"
          visible
        />
      ) : (
        isSuccess && (
          <Box>
            <HeaderTabs
              orders={shoppingData}
              onRemove={removeCartQuantity}
              onDelete={deleteCartItem}
              onQuantity={addCartQuantity}
              onClear={clearCartData}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
            />

            <Container size="xl" mt={20}>
              <Flex mb={40} align="center">
                <Title order={1}>{product?.name}</Title>
                {product.is_sale && (
                  <Badge ml={50} variant="filled" color="red" size="lg">
                    {percentageCalc(product.price, product.sale_price)}% off
                  </Badge>
                )}
              </Flex>
              <Stack pb={100}>
                <Flex
                  justify="space-evenly"
                  direction={width < 800 && "column"}>
                  <Flex direction="column">
                    <Text color="dimmed" weight={500} size="xl" mb={20}>
                      Available quantity: {product?.quantity}
                    </Text>
                    <Image
                      src={product.image || noImage}
                      maw={500}
                      alt="Random image"
                    />
                  </Flex>
                  <Flex direction="column" gap={30}>
                    <Group
                      style={{ flexDirection: "column", gap: 30 }}
                      mt={width < 800 ? 30 : 10}>
                      {product.is_sale ? (
                        <>
                          <Title
                            truncate
                            td="line-through"
                            color="dark"
                            fz={25}
                            weight={400}
                            sx={{ lineHeight: 1 }}>
                            {product.price.toFixed(2)}€
                          </Title>
                          <Title
                            truncate
                            color="red.6"
                            weight={400}
                            sx={{ lineHeight: 1 }}>
                            {product.sale_price.toFixed(2)}€
                          </Title>
                        </>
                      ) : (
                        <Box>
                          <Title
                            truncate
                            color="dark"
                            weight={400}
                            sx={{ lineHeight: 1 }}>
                            {product.price.toFixed(2)}€
                          </Title>
                        </Box>
                      )}

                      <Text color="dimmed" weight={500} size="xl">
                        Add quantity
                      </Text>
                      <Group>
                        <ActionIcon
                          className={classes.btn}
                          onClick={() => handleRemoveQuantity()}>
                          <IconSquareMinus size={30} />
                        </ActionIcon>
                        <Text color="dimmed" weight={500} size="sm">
                          {selectedQuantity}
                        </Text>
                        <ActionIcon
                          className={classes.btn}
                          onClick={() => handleAddQuantity()}>
                          <IconSquarePlus size={30} />
                        </ActionIcon>
                      </Group>
                    </Group>
                    <Group position="center">
                      <Button
                        disabled={!selectedQuantity ?? 0}
                        color="dark"
                        onClick={() => handleAddCart(product)}>
                        Add to cart
                      </Button>
                    </Group>
                  </Flex>
                </Flex>
              </Stack>

              <Accordion
                className={classes.accord}
                multiple
                defaultValue={["description"]}>
                <Accordion.Item value="description" sx={{}}>
                  <Accordion.Control>Description</Accordion.Control>
                  <Accordion.Panel>{product.description}</Accordion.Panel>
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

              <Group mt={50} mb={50} position="center">
                <Button color="dark" radius={6} onClick={() => navigate(-1)}>
                  Return
                </Button>
              </Group>
            </Container>
            <Footer />
          </Box>
        )
      )}
    </>
  );
}
