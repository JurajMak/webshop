import React, { useState } from "react";
import {
  Drawer,
  useMantineTheme,
  Accordion,
  Badge,
  Chip,
  Flex,
  Button,
  ActionIcon,
  Text,
  Group,
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import { filterRangePrice } from "../../../utils/priceRanges";

export function FilterDrawer({
  opened,
  onClose,
  value,
  setValue,
  category,
  onCategory,
  priceRange,
  onRange,
}) {
  const theme = useMantineTheme();
  const [isOpen, setIsOpen] = useState(false);

  const matchedRangeLabel = filterRangePrice.find(
    (option) => option.value === Number(priceRange)
  );

  return (
    <Drawer
      title="Filters"
      size="xl"
      padding="xs"
      opened={opened}
      onClose={onClose}
      transitionDuration={550}
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
        [".mantine-Drawer-title"]: { fontSize: 30, fontWeight: 600 },
      }}>
      <Accordion
        multiple
        // defaultValue={["active", "price", "category", "focus-ring"]}
        value={["active", "price", "category", "focus-ring"]}>
        {isOpen && (
          <Accordion.Item value="active">
            <Accordion.Control>
              <Group position="apart" style={{ gap: 20 }}>
                <Text>Active Filter</Text>
                <Button
                  variant="transparent"
                  color="dark"
                  onClick={() => {
                    setValue("");
                    onCategory("");
                    onRange();
                    setIsOpen(false);
                  }}>
                  Clear filter
                </Button>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              {value && (
                <Flex align="center">
                  <Badge color="dark" fz={13}>
                    {value}
                  </Badge>
                  <ActionIcon
                    onClick={() => {
                      setValue("");
                      onCategory("");
                    }}>
                    <IconX size={16} />
                  </ActionIcon>
                </Flex>
              )}

              {priceRange > 0 && (
                <Flex align="center">
                  <Badge color="dark" fz={13}>
                    {matchedRangeLabel.label}
                  </Badge>
                  <ActionIcon
                    onClick={() => {
                      onRange();
                    }}>
                    <IconX size={16} />
                  </ActionIcon>
                </Flex>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        )}

        <Accordion.Item value="price">
          <Accordion.Control>Price range</Accordion.Control>
          <Accordion.Panel>
            <Flex wrap="wrap" gap={5}>
              {filterRangePrice?.map((item, i) => {
                return (
                  <Chip.Group
                    key={i}
                    multiple={false}
                    value={priceRange}
                    onChange={onRange}>
                    <Chip
                      color="dark"
                      value={item.value}
                      onClick={() => setIsOpen(true)}>
                      {item.label}
                    </Chip>
                  </Chip.Group>
                );
              })}
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="category">
          <Accordion.Control>Category</Accordion.Control>
          <Accordion.Panel>
            <Flex wrap="wrap" gap={5}>
              {category?.map((item, i) => {
                return (
                  <Chip.Group
                    key={i}
                    multiple={false}
                    value={value}
                    onChange={setValue}>
                    <Chip
                      color="dark"
                      value={item.name}
                      onClick={() => {
                        onCategory(item.id);
                        setIsOpen(true);
                      }}>
                      {item.name}
                    </Chip>
                  </Chip.Group>
                );
              })}
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="customization">
          <Accordion.Control>Sizes</Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit
            your design needs
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus-ring">
          <Accordion.Control>Some other filter</Accordion.Control>
          <Accordion.Panel>
            With new :focus-visible pseudo-class focus ring appears only when
            user navigates with keyboard
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Drawer>
  );
}
