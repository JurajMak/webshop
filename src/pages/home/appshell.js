import { useState } from "react";
import { AppShell, Navbar, Footer, Text, useMantineTheme } from "@mantine/core";
import ProductsCard from "./test";
import { Wrapper, ProductsWrapper, GridWrapper } from "./Styles";
import HeaderTabs from "../../components/header/Index";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const fakeData = [
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
    "$168.00",
  ];
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
        {fakeData.map((item, index) => {
          return (
            <ProductsWrapper key={index}>
              <ProductsCard text={item} />
            </ProductsWrapper>
          );
        })}
      </Wrapper>
    </AppShell>
  );
}
