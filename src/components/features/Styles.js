import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: "absolute",
    height: 110,
    width: 260,
    top: 0,
    left: 0,
    zIndex: 1,
    background: "linear-gradient(135deg, #c13584, #f56040, #fcaf45)",
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  icon: { color: "#2C2E33" },
}));
