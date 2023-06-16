import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    // background: "#CED4DA",
    // borderColor: "#CED4DA",
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  btn: {
    "&:hover": {
      background: "#062343",
      color: "#fff",
    },
  },
}));
