import { showNotification, cleanNotifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons";

export const handleQuantityNotification = () => {
  showNotification({
    title: "Quantity exceeded",
    message:
      " Cannot add more of that product to cart remaining quantity is 0 🤥",
    color: "red",
    icon: <IconX />,
    onClose: () => cleanNotifications(),
    // styles: (theme) => ({
    //   root: {
    //     backgroundColor: theme.colors.blue[6],
    //     borderColor: theme.colors.blue[6],

    //     "&::before": { backgroundColor: theme.white },
    //   },

    //   title: { color: theme.white },
    //   description: { color: theme.white },
    //   closeButton: {
    //     color: theme.white,
    //     "&:hover": { backgroundColor: theme.colors.blue[7] },
    //   },
    // }),
  });
};

export const handleProductNotification = () => {
  showNotification({
    title: "Warning can't perform action",
    message: " This product is part of an order and cannot be deleted!",
    color: "red",
    icon: <IconX />,
    onClose: () => cleanNotifications(),
  });
};

export const handleUserProductNotification = () => {
  showNotification({
    title: "Warning can't perform action",
    message: "  Cannot delete product of other users!",
    color: "red",
    icon: <IconX />,
    onClose: () => cleanNotifications(),
  });
};
