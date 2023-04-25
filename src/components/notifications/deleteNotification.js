import { showNotification, cleanNotifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export const handleDeleteNotification = (item) => {
  showNotification({
    title: "Succesfully deleted product!",
    message: `${item} successfully deleted from list`,
    color: "red",
    icon: <IconCheck />,
    onClose: () => cleanNotifications(),
    autoClose: 5000,
  });
};
