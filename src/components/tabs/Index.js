import { Group, Tabs } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SubHeaderTabs = ({ onCategory, theme }) => {
  const navigate = useNavigate();
  return (
    <Group position="center">
      <Tabs
        mt={10}
        variant="pills"
        // value={tabValue}
        color="yellow.8"
        sx={{
          [".mantine-Tabs-tab"]: {
            // color: "black",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: theme.colors.yellow[8],
              color: theme.colors.dark[8],
            },
          },
        }}
        onTabChange={(value) => navigate(`/${value}`)}>
        <Tabs.List position="center">
          <Tabs.Tab value="products">Products</Tabs.Tab>
          <Tabs.Tab value="categories" onClick={onCategory}>
            Categories
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Group>
  );
};

export default SubHeaderTabs;
