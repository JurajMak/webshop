import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${1} solid ${
      theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.gray[2]
    }`,
    paddingInline: 20,

    padding: 20,

    // background: "linear-gradient(to right, #062343, #041428, #000205)",
  },

  inner: {
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md} ${theme.spacing.md}`,

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
}));
