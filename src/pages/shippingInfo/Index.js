import {
  createStyles,
  TextInput,
  Checkbox,
  Title,
  Button,
  Group,
  Container,
  Textarea,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconAt, IconNote } from "@tabler/icons";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { AuthContext } from "../../contexts/Index";
import { useStyles, Form } from "./Styles";
import { useViewportSize } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { createShippingInfo } from "../../api/shippingInfo";

const ShippingInfo = () => {
  const { classes } = useStyles();
  const { height } = useViewportSize();

  const form = useForm({
    name: "",
    country: "",
    address: "",
    zip: 0,
    note: "",
  });
  const navigate = useNavigate();

  const createShippingInfoMutation = useMutation({
    mutationFn: (item) => createShippingInfo(item),
  });

  const handleSubmit = async () => {
    await createShippingInfoMutation.mutateAsync(form.values);
    // console.log(form.values);
  };

  const returnHome = () => {
    navigate(-1);
  };

  return (
    <Container
      sizes="xl"
      className={classes.wrapper}
      sx={{ minHeight: height }}>
      {/* <Paper className={classes.form} radius={0} p={30}> */}
      <Title
        order={2}
        className={classes.title}
        align="center"
        pt={100}
        mb={50}>
        Shipping Info
      </Title>

      <Form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Deliver To"
          placeholder="Full name"
          icon={<IconAt size={14} />}
          {...form.getInputProps("name")}
        />

        <TextInput
          label="Country"
          placeholder="Country"
          withAsterisk
          icon={<IconAt size={14} />}
          {...form.getInputProps("country")}
        />
        <TextInput
          label="Shipping Address"
          placeholder="Address"
          withAsterisk
          icon={<IconAt size={14} />}
          {...form.getInputProps("address")}
        />
        <TextInput
          label="ZIP"
          placeholder="ZIP code"
          withAsterisk
          icon={<IconAt size={14} />}
          {...form.getInputProps("zip")}
        />
        <Textarea
          label="Note"
          placeholder="Write additional note..."
          icon={<IconNote size={14} />}
          {...form.getInputProps("note")}
        />

        <Group mt={20}>
          <Button
            // color="dark"
            // c="dark"
            type="submit"
            variant="gradient"
            gradient={{ from: "pink", to: "yellow" }}>
            Proceed to payment
          </Button>
          <Button color="dark" onClick={returnHome}>
            Return
          </Button>
        </Group>
      </Form>

      {/* </Paper> */}
    </Container>
  );
};

export default ShippingInfo;
