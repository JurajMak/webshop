import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
  },
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  mobile: {
    [theme.fn.smallerThan("sm")]: {
      position: "right",
    },
  },
  btn: {
    [`&:hover`]: {
      background: theme.colors.yellow[8],
      color: theme.colors.dark[4],
    },
  },
  indicator: {
    [".mantine-Indicator-common"]: { color: "black" },
  },

  tabs: {
    [".mantine-Tabs-tab"]: {
      color: "white",
      fontWeight: 600,
      "&:hover": {
        backgroundColor: theme.colors.yellow[8],
        color: theme.colors.dark[8],
      },
    },
  },
}));
