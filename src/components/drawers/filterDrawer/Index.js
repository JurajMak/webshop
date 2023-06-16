import React, { useState } from "react";
import {
  Drawer,
  useMantineTheme,
  Accordion,
  Chip,
  Flex,
  ActionIcon,
  Text,
  Group,
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import { filterRangePrice } from "../../../utils/priceRanges";
import CustomChip from "../../customChip/Index";
import { useStyles } from "./Styles";

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
  const { classes } = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [accord, setAccord] = useState([
    "active",
    "price",
    "category",
    "sizes",
    "focus-ring",
  ]);

  return (
    <Drawer
      className={classes.root}
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
      overlayBlur={3}>
      <Accordion
        className={classes.accord}
        multiple
        value={accord}
        onChange={setAccord}>
        {isOpen && (
          <Accordion.Item value="active">
            <Accordion.Control>
              <Group position="apart" style={{ gap: 20 }}>
                <Text>Active Filters</Text>
                <Chip
                  variant="transparent"
                  color="dark"
                  onClick={() => {
                    setValue("");
                    onCategory("");
                    onRange("");
                    setIsOpen(false);
                  }}>
                  Clear filter
                </Chip>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Flex gap={15}>
                {value && (
                  <Flex align="center">
                    <CustomChip checked>{value}</CustomChip>
                    <ActionIcon
                      className={classes.btn}
                      radius="xl"
                      onClick={() => {
                        setValue("");
                        onCategory("");
                      }}>
                      <IconX size={16} />
                    </ActionIcon>
                  </Flex>
                )}

                {priceRange && (
                  <Flex align="center">
                    <CustomChip checked>{priceRange}</CustomChip>
                    <ActionIcon
                      className={classes.btn}
                      radius="xl"
                      onClick={() => {
                        onRange("");
                      }}>
                      <IconX size={16} />
                    </ActionIcon>
                  </Flex>
                )}
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>
        )}

        <Accordion.Item value="price">
          <Accordion.Control>
            <Text>Price range</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Flex wrap="wrap" gap={5}>
              {filterRangePrice?.map((item, i) => {
                return (
                  <Chip.Group
                    key={i}
                    multiple={false}
                    value={priceRange}
                    onChange={onRange}>
                    <CustomChip
                      variant="outline"
                      value={item.label}
                      onClick={() => {
                        setIsOpen(true);
                        setAccord([...accord, "active"]);
                      }}>
                      {item.label}
                    </CustomChip>
                  </Chip.Group>
                );
              })}
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="category">
          <Accordion.Control>
            <Text>Categories</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Flex wrap="wrap" gap={5}>
              {category?.map((item, i) => {
                return (
                  <Chip.Group
                    key={i}
                    multiple={false}
                    value={value}
                    onChange={setValue}>
                    <CustomChip
                      color="dark"
                      variant="outline"
                      value={item.name}
                      onClick={() => {
                        onCategory(item.id);
                        setIsOpen(true);
                        setAccord([...accord, "active"]);
                      }}>
                      {item.name}
                    </CustomChip>
                  </Chip.Group>
                );
              })}
            </Flex>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="sizes">
          <Accordion.Control>TODO Sizes</Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit
            your design needs
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus-ring">
          <Accordion.Control>TODO Some other filter</Accordion.Control>
          <Accordion.Panel>
            With new :focus-visible pseudo-class focus ring appears only when
            user navigates with keyboard
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Drawer>
  );
}
