import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  root: {
    [".mantine-Drawer-drawer"]: {
      background: "linear-gradient(135deg, #c13584, #f56040, #fcaf45)",
    },
    [".mantine-Drawer-closeButton"]: {
      width: "30px",
      height: "30px",

      "&:hover": {
        background: "#062343",
      },
    },
    ["& .mantine-Drawer-closeButton svg"]: {
      color: "black",
      width: "30px",
      height: "30px",
      "&:hover": {
        color: "#fff",
      },
    },
    [".mantine-Drawer-title"]: { fontSize: 30, fontWeight: 600 },
  },
  accord: {
    [".mantine-Accordion-control"]: {
      "&:hover": {
        background: "transparent",
      },
    },
  },
  btn: {
    "&:hover": {
      background: "#062343",
      color: "#fff",
    },
  },
}));
