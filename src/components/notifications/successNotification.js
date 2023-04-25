import { showNotification, cleanNotifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export const handleSuccesCreation = (item) => {
  showNotification({
    title: "New product added !",
    message: `${item} successfully added to product list`,
    color: "teal",
    icon: <IconCheck />,
    onClose: () => cleanNotifications(),
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.blue[6],
        borderColor: theme.colors.blue[6],

        "&::before": { backgroundColor: theme.white },
      },

      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        "&:hover": { backgroundColor: theme.colors.blue[7] },
      },
    }),
  });
};
