import { showNotification, cleanNotifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export const handleDeleteProductNotification = () => {
  showNotification({
    title: `Successfully deleted product!`,
    message: `Product successfully deleted from list`,
    color: "teal",
    icon: <IconCheck />,
    onClose: () => cleanNotifications(),
    autoClose: 2000,
    styles: (theme) => ({
      title: { fontSize: 16 },
      description: {
        color: theme.colors.dark,
        fontWeight: 500,
      },
    }),
  });
};
