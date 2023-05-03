import { IconEye, IconMessageCircle } from "@tabler/icons";
import {
  Card,
  Text,
  Group,
  Center,
  createStyles,
  Image,
  UnstyledButton,
} from "@mantine/core";
import test from "../../../assets/register.jpg";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    height: 300,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    [`&:hover`]: {
      transform: "scale(1.03)",
    },
  },

  image: {
    ...theme.fn.cover(),
    backgroundSize: "cover",
    transition: "transform 500ms ease",
  },

  overlay: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
  },

  content: {
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 1,
  },

  title: {
    color: theme.white,
    // marginBottom: rem(5),
  },

  bodyText: {
    color: theme.colors.dark[2],
    // marginLeft: rem(7),
  },

  author: {
    color: theme.colors.dark[2],
  },
}));

export function CategoryCard({ data, onClick }) {
  const { classes, theme } = useStyles();
  const { name, image } = data;

  return (
    <UnstyledButton onClick={onClick}>
      <Card
        miw={250}
        p="lg"
        shadow="lg"
        className={classes.card}
        radius="md"
        component="a"
        target="_blank">
        <Image
          className={classes.image}
          maw={250}
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
