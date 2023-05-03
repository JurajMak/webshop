import { showNotification, cleanNotifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export const handleSuccessCreationNotification = (item) => {
  showNotification({
    title: "New product added !",
    message: `${item} successfully added to product list`,
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

export const handleSuccessCategoryNotification = (item) => {
  showNotification({
    title: "New category added!",
    message: `${item} category successfully created.`,
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

export const handleSuccessUpdateNotification = (item) => {
  showNotification({
    title: `Successfull update!`,
    message: `${item} successfully updated.`,
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

export const handleSuccessLogoutNotification = (item) => {
  showNotification({
    title: `You are now logged out, ${item}.`,
    message: `Thank you for using our app.`,
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
