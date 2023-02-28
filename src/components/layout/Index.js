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
// import ProductsCard from "../productCard/Index";
import ProductsCard from "../productCard/test";
import { Wrapper, ProductsWrapper } from "../../pages/home/Styles";
// import HeaderTabs from "../header/Index";
import { AuthContext } from "../../contexts/Index";
import React from "react";
import InputWithButton from "../search/Index";
import HeaderTabs from "../header/test";
export default function AppShellLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data } = React.useContext(AuthContext);
  const [search, setSearch] = useState("");

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
          width={{ sm: 200, lg: 300 }}>
          <Text>Search</Text>
          <InputWithButton
            onChange={(e) => setSearch(e.target.value)}
            value={search}></InputWithButton>

          {data
            .filter((item) => {
              if (search === "") {
                return "";
              } else if (
                item.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item, index) => (
              <div key={index}>
                <p>
                  {item.title}, ${item.price}.
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
      header={<HeaderTabs />}>
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
