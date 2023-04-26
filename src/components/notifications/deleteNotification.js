import { showNotification, cleanNotifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export const handleDeleteNotification = () => {
  showNotification({
    title: `Successfully deleted product!`,
    message: `Product successfully deleted from list`,
    color: "teal",
    icon: <IconCheck />,
    onClose: () => cleanNotifications(),
    autoClose: 3000,
    styles: (theme) => ({
      title: { fontSize: 16 },
      description: {
        color: theme.colors.dark,
        fontWeight: 500,
      },
    }),
  });
};
