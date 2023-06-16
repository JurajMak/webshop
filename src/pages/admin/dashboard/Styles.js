import { createStyles } from "@mantine/core";

export const useStyle = createStyles((theme) => ({
  tabs: {
    [".mantine-Tabs-tab"]: {
      color: theme.colors.gray[0],
      fontWeight: 600,
      "&:hover": {
        backgroundColor: theme.colors.yellow[8],
        color: theme.colors.dark[4],
      },
    },
  },
}));
