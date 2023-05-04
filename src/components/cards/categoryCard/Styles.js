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
    transition: "transform 500ms ease",
  },

  overlay: {
    position: "absolute",
    top: "20%",
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
    color: theme.white,
    // marginBottom: rem(5),
  },

  bodyText: {
    color: theme.colors.dark[2],
    // marginLeft: rem(7),
  },

  author: {
    color: theme.colors.dark[2],
  },
}));
