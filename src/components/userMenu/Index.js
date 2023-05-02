import {
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconTrash,
} from "@tabler/icons";
import { Group, Avatar, Text, Menu, UnstyledButton } from "@mantine/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Index";

export default function UserMenu() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user, signOut } = useContext(AuthContext);

  return (
    <Group>
      <Menu
        width={260}
        position="bottom-end"
        transition="pop-top-right"
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}>
        <Menu.Target>
          <UnstyledButton>
            <Group spacing={7}>
              <Avatar radius="xl" size={30} />
              <Text weight={500} size="md" sx={{ lineHeight: 1 }} mr={3}>
                Welcome {user?.user_metadata.full_name} !
              </Text>
              <IconChevronDown size={12} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Divider />
          <Menu.Label>Settings</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
            Account settings
          </Menu.Item>
          <Menu.Item color="red.9" icon={<IconTrash size={14} stroke={1.5} />}>
            Delete account
          </Menu.Item>
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
