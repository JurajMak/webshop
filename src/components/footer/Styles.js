import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  footer: {
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
