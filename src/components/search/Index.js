import { TextInput, ActionIcon } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

export function SearchBar(props) {
  return (
    <TextInput
      radius="sm"
      size="md"
      maxLength={30}
      // placeholder={props.placeholder}
      rightSection={
        <ActionIcon size={32} radius="xl" variant="transparent" mr="auto">
          <IconSearch size="1.1rem" stroke={1.5} onClick={props.onClick} />
        </ActionIcon>
      }
      {...props}
    />
  );
}

export default SearchBar;
