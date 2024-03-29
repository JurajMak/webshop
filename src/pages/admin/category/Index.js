import React, { useContext } from "react";
import { Form } from "./Styles";
import { AuthContext } from "../../../contexts/Index";
import { createCategory, getCategory } from "../../../api/categories";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  createStyles,
  TextInput,
  Button,
  Group,
  Container,
  Title,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { handleSuccessCategoryNotification } from "../../../components/notifications/successNotification";
import { useStyles } from "./Styles";
import { useViewportSize } from "@mantine/hooks";

const CreateCategory = () => {
  const { classes } = useStyles();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const navigate = useNavigate();
  const { height } = useViewportSize();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
  });
  const { name, description } = form.values;

  const {
    data: category,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory(value),
  });

  const createCategoryMutation = useMutation({
    mutationFn: (item) => createCategory(item.category, item.desc, item.userId),
    onSuccess: () => {
      handleSuccessCategoryNotification(name);
    },
  });

  const handleCreateCategory = async () => {
    const create = {
      category: name,
      desc: description === "" ? null : description,
      userId: user.id,
    };
    await createCategoryMutation.mutateAsync(create);
    refetch();
    form.reset();
  };

  const handleReturn = () => {
    navigate("/admin");
  };
  const mappedCategories = category?.map((item) => item.name);
  const handleNewEntry = () => {
    form.reset();
    setValue("");
  };

  return (
    <Container
      sizes="xl"
      className={classes.wrapper}
      sx={{ minHeight: height }}>
      <Title order={1} className={classes.title} align="center" pt={50} mb={50}>
        Add new Category
      </Title>

      <Form onSubmit={form.onSubmit(handleCreateCategory)}>
        <Group position="right">
          <Button
            variant="subtle"
            color="dark"
            ml={350}
            onClick={handleNewEntry}>
            New Entry
          </Button>
        </Group>

        {!isLoading && (
          <Select
            mb={10}
            label="Categories"
            searchable
            clearable
            placeholder="Available categories"
            value={value}
            data={mappedCategories}
            onChange={setValue}
          />
        )}

        <TextInput label="Category" mb={10} {...form.getInputProps("name")} />

        <TextInput
          mb={10}
          label="Description of category"
          {...form.getInputProps("description")}
        />

        <Group>
          <Button type="submit" color="dark" loading={loading}>
            Submit
          </Button>
          <Button color="dark" onClick={handleReturn}>
            Return
          </Button>
        </Group>
      </Form>
    </Container>
  );
};

export default CreateCategory;
