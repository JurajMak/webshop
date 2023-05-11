import { IconEye, IconMessageCircle } from "@tabler/icons";
import {
  Card,
  Text,
  Group,
  Center,
  Image,
  UnstyledButton,
} from "@mantine/core";
import test from "../../../assets/register.jpg";
import { useStyles } from "./Styles";

export function CategoryCard({ data, onClick }) {
  const { classes, theme } = useStyles();
  const { name, image } = data;

  return (
    <UnstyledButton onClick={onClick}>
      <Card
        miw={250}
        maw={250}
        p="lg"
        shadow="lg"
        className={classes.card}
        radius="md"
        component="a"
        target="_blank">
        <Image
          className={classes.image}
          // maw={250}
          src={image ? image : test}
          alt="No image to display"
        />
        <div className={classes.overlay} />

        <div className={classes.content}>
          <div>
            <Text size="lg" className={classes.title} weight={500}>
              {name}
            </Text>

            <Group position="apart" spacing="xs">
              <Text size="sm" className={classes.author}></Text>

              <Group spacing="lg">
                <Center>
                  <IconEye
                    size="1rem"
                    stroke={1.5}
                    color={theme.colors.dark[2]}
                  />
                  <Text size="sm" className={classes.bodyText}>
                    {/* gadgadgadgadgadg */}
                  </Text>
                </Center>
                <Center>
                  <IconMessageCircle
                    size="1rem"
                    stroke={1.5}
                    color={theme.colors.dark[2]}
                  />
                  <Text size="sm" className={classes.bodyText}></Text>
                </Center>
              </Group>
            </Group>
          </div>
        </div>
      </Card>
    </UnstyledButton>
  );
}
