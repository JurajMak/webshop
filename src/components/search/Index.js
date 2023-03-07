import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";

export function SearchBar(props) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      maxLength={30}
      placeholder={props.placeholder}
      rightSectionWidth={42}
      {...props}
    />
  );
}

export default SearchBar;
