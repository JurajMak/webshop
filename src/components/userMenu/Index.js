import {
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconTrash,
  IconShoppingCart,
  IconCategory,
  IconShoppingBag,
} from "@tabler/icons";
import {
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  Flex,
  Burger,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Index";
import NotificationIcon from "../notificationCartIcon/Index";
import { useViewportSize } from "@mantine/hooks";
import { useStyles } from "./Styles";

export default function UserMenu({ orders, onDrawer, onCategory, onProduct }) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user, signOut } = useContext(AuthContext);
  const { classes } = useStyles();
  const { height, width } = useViewportSize();
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <Group mx={10}>
      <Menu
        width={260}
        position="bottom-end"
        transition="pop-top-right"
        onClose={() => {
          setUserMenuOpened(false);
          setBurgerOpen(false);
        }}
        onOpen={() => setUserMenuOpened(true)}>
        <Menu.Target>
          {width > 500 ? (
            <UnstyledButton>
              <Group spacing={7}>
                <Avatar radius="xl" size={30} />
                <Text weight={500} size="md" sx={{ lineHeight: 1 }} mr={3}>
                  {user?.user_metadata.full_name}
                </Text>
                <IconChevronDown size={12} stroke={1.5} />
              </Group>
            </UnstyledButton>
          ) : (
            <Burger
              transitionDuration={500}
              opened={burgerOpen}
              onClick={() => setBurgerOpen(true)}
            />
          )}
        </Menu.Target>
        <Menu.Dropdown>
          {width < 500 && (
            <Group>
              <Avatar radius="xl" size={30} />
              <Text weight={500} size="md" sx={{ lineHeight: 1 }} mr={3}>
                {user?.user_metadata.full_name}
              </Text>
            </Group>
          )}
          {user?.user_metadata.role === "user" && (
            <Menu.Label>Shopping cart</Menu.Label>
          )}
          {user?.user_metadata.role === "user" && (
            <Flex justify="center" align="center">
              <Menu.Item
                icon={<IconShoppingCart size={14} stroke={1.5} />}
                onClick={onDrawer}>
                Cart items
              </Menu.Item>
              {orders?.length > 0 && (
                <NotificationIcon
                  box={classes.notification}
                  orders={orders.length}
                  text={classes.text}
                />
              )}
            </Flex>
          )}
          {user?.user_metadata.role === "admin" && (
            <Menu.Label>Product settings</Menu.Label>
          )}

          {user?.user_metadata.role === "admin" && (
            <Group style={{ gap: 0 }}>
              <Menu.Item
                icon={<IconCategory size={14} stroke={1.5} />}
                onClick={onCategory}>
                Add category
              </Menu.Item>
              <Menu.Item
                icon={<IconShoppingBag size={14} stroke={1.5} />}
                onClick={onProduct}>
                Add product
              </Menu.Item>
            </Group>
          )}

          <Menu.Divider />
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
            Account settings
          </Menu.Item>
          <Menu.Item color="red.9" icon={<IconTrash size={14} stroke={1.5} />}>
            Delete account
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color="red.9"
            icon={<IconLogout size={14} stroke={1.5} />}
            onClick={signOut}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
