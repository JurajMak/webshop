import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    height: 300,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    [`&:hover`]: {
      transform: "scale(1.03)",
      transition: "transform 500ms ease",
    },
  },

  image: {
    ...theme.fn.cover(),
    backgroundSize: "cover",
  },

  overlay: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
  },

  content: {
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 1,
  },

  title: {
    color: theme.colors.gray[0],
    marginBottom: 5,
  },

  bodyText: {
    color: theme.colors.gray[1],
    marginRight: 20,
  },

  rating: {
    position: "absolute",
    top: 10,
    left: 10,
    pointerEvents: "none",
  },
  btn: {
    position: "absolute",
    top: -10,
    right: -10,
  },
}));
