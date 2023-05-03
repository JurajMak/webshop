import { TextInput, useMantineTheme, ActionIcon } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

export function SearchBar(props) {
  const theme = useMantineTheme();

  return (
    <TextInput
      radius="sm"
      size="md"
      mx={props.mx}
      mr={props.mr}
      ml={props.ml}
      p={props.p}
      pb={props.pb}
      pt={props.pt}
      sx={props.sx}
      width={props.width}
      height={props.height}
      mah={props.mah}
      maw={props.maw}
      mih={props.mih}
      miw={props.miw}
      maxLength={30}
      placeholder={props.placeholder}
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
