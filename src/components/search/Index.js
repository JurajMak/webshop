import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";

export function InputWithButton(props) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      maxLength={30}
      rightSection={
        <ActionIcon
          // onClick={props.onClick}
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled">
          {theme.dir === "ltr" ? (
            <IconArrowRight size={18} stroke={1.5} />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search products"
      rightSectionWidth={42}
      {...props}
    />
  );
}

export default InputWithButton;