import { showNotification, cleanNotifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export const handlePaymentNotification = () => {
  showNotification({
    title: "Order Confirmed !",
    message: "Thank you for your purchase! Enjoy your new products!",
    color: "teal",
    icon: <IconCheck />,
    onClose: () => cleanNotifications(),
  });
};
