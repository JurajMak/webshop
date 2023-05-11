import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  notification: {
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: theme.colors.blue[6],
    width: 30,
    height: 20,
    borderRadius: 50,
    marginRight: 50,
  },
  text: {
    fontSize: 12,
    fontWeight: 400,
    color: theme.colors.gray[0],
  },
}));
