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

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const CreateCategory = () => {
  const { classes } = useStyles();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
  });
  const { name, description } = form.values;

  const { data: category, isLoading } = useQuery({
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
    <Container sizes="xl" className={classes.wrapper}>
      <Title order={1} className={classes.title} align="center" pt={50} mb={50}>
        Add new Category
      </Title>

      <Form onSubmit={form.onSubmit(handleCreateCategory)}>
        <Group position="right">
          <Button variant="subtle" ml={350} onClick={handleNewEntry}>
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
          <Button type="submit" loading={loading}>
            Submit
          </Button>
          <Button onClick={handleReturn}>Return</Button>
        </Group>
      </Form>
    </Container>
  );
};

export default CreateCategory;
