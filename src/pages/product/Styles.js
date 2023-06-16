import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  accord: {
    [".mantine-Accordion-label"]: {
      fontWeight: 700,
      fontSize: 20,
    },
    [".mantine-Accordion-control"]: {
      "&:hover": {
        background: "transparent",
      },
    },
  },

  btn: {
    "&:hover": {
      background: "#1A1B1E",
      color: "#fff",
    },
  },
}));
