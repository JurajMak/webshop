import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${1} solid ${
      theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.gray[2]
    }`,
    paddingInline: 30,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
  btn: {
    border: "none",
  },
}));
