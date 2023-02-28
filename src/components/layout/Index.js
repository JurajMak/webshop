import { useState } from "react";
import {
  AppShell,
  Navbar,
  Footer,
  Text,
  useMantineTheme,
  TextInput,
  Input,
} from "@mantine/core";
import ProductsCard from "../productCard/Index";
import { Wrapper, ProductsWrapper } from "../../pages/home/Styles";
import HeaderTabs from "../header/Index";
import { AuthContext } from "../../contexts/Index";
import React from "react";
import InputWithButton from "../search/Index";
export default function AppShellLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data } = React.useContext(AuthContext);
  const [query, setQuery] = useState("");

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Search</Text>
          <InputWithButton
            onChange={(event) => setQuery(event.target.value)}
          ></InputWithButton>
          {data
            .filter((post) => {
              if (query === "") {
                return "";
              } else if (
                post.title.toLowerCase().includes(query.toLowerCase())
              ) {
                return post;
              }
            })
            .map((post, index) => (
              <div key={index}>
                <p>
                  {post.title}, ${post.price}.
                </p>
              </div>
            ))}
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={<HeaderTabs />}
    >
      <Wrapper>
        {data?.map((item, index) => {
          return (
            <ProductsWrapper key={index}>
              <ProductsCard data={item} />
            </ProductsWrapper>
          );
        })}
      </Wrapper>
    </AppShell>
  );
}

// {data
//   ?.filter((item) => {
//     if (selectedSize) {
//       return item.availableSizes.includes(selectedSize);
//     }
//     return item;
//   })
