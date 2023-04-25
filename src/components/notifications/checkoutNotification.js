import { showNotification, cleanNotifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export const handlePaymentNotification = () => {
  showNotification({
    title: "Order Confirmed !",
    message: "Thank you for your purchase! Enjoy your new products!",
    color: "teal",
    icon: <IconCheck />,
    onClose: () => cleanNotifications(),
    autoClose: 5000,
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
