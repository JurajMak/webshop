import {
  Drawer,
  useMantineTheme,
  Accordion,
  Navbar,
  Group,
} from "@mantine/core";

export function FilterDrawer({ opened, onClose }) {
  const theme = useMantineTheme();

  return (
    <Drawer
      size="xl"
      padding="xs"
      opened={opened}
      onClose={onClose}
      transition="rotate-left"
      transitionDuration={250}
      transitionTimingFunction="ease"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[7]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      sx={{
        [".mantine-Drawer-closeButton"]: {
          width: "30px",
          height: "30px",
        },
        ["& .mantine-Drawer-closeButton svg"]: {
          color: "black",
          width: "30px",
          height: "30px",
        },
      }}>
      <Accordion
        multiple
        defaultValue={["customization", "flexibility", "focus-ring"]}>
        <Accordion.Item value="customization">
          <Accordion.Control>Customization</Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit
            your design needs
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="flexibility">
          <Accordion.Control>Flexibility</Accordion.Control>
          <Accordion.Panel>
            Configure components appearance and behavior with vast amount of
            settings or overwrite any part of component styles
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus-ring">
          <Accordion.Control>No annoying focus ring</Accordion.Control>
          <Accordion.Panel>
            With new :focus-visible pseudo-class focus ring appears only when
            user navigates with keyboard
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Drawer>
  );
}
