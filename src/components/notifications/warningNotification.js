import { showNotification, cleanNotifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons";

export const warningQuantityNotification = () => {
  showNotification({
    title: "Quantity exceeded",
    message: " Cannot add more of that product to cart!",
    color: "red",
    icon: <IconX />,
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

export const warningProductNotification = () => {
  showNotification({
    title: "Warning can't perform action!",
    message: " This product is part of an order and cannot be deleted!",
    color: "red",
    icon: <IconX />,
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

export const warningUserProductNotification = () => {
  showNotification({
    title: "Warning can't perform action",
    message: "  Cannot delete product of other users!",
    color: "red",
    icon: <IconX />,
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

export const warningUserLoginNotification = (item) => {
  showNotification({
    title: `${item}`,
    message: "Incorrect email or password. Please try again.",
    color: "red",
    icon: <IconX />,
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
export const warningUserSignUpNotification = (item) => {
  showNotification({
    title: `${item}`,
    message: "Please fill out all required fields before submitting the form.",
    color: "red",
    icon: <IconX />,
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
