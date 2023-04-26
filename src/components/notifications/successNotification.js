import { showNotification, cleanNotifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export const handleSuccessCreation = (item) => {
  showNotification({
    title: "New product added !",
    message: `${item} successfully added to product list`,
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

export const handleSuccessCategory = (item) => {
  showNotification({
    title: "New category added!",
    message: `${item} category successfully created.`,
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

export const handleSuccessUpdate = (item) => {
  showNotification({
    title: `Successfull update!`,
    message: `${item} successfully updated.`,
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
