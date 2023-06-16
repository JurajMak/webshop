import { createStyles, Anchor, Group, ActionIcon, Box } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
} from "@tabler/icons";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { mockLinks } from "./mockLinks";
import { Link } from "react-router-dom";
import { useStyles } from "./Styles";

export function Footer() {
  const { classes } = useStyles();

  const items = mockLinks.map((link) => (
    <Anchor
      c=" #868E96"
      fw={500}
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <Box className={classes.footer}>
      <Box className={classes.inner}>
        <Logo />
        <Group className={classes.links}>{items}</Group>

        <Group spacing="xs" position="right" noWrap>
          <Link to="https://www.twitter.com/" target="blank">
            <ActionIcon size="lg" variant="default" radius="sm">
              <IconBrandTwitter
                size="2rem"
                stroke={1.5}
                color="#1DA1F2"
                fill="#1DA1F2"
              />
            </ActionIcon>
          </Link>

          <Link to="https://www.facebook.com/" target="_blank">
            <ActionIcon size="lg" variant="default" radius="sm" bg="#4064AC">
              <IconBrandFacebook
                size="2rem"
                stroke={1.5}
                color="#4064AC"
                fill="#fff"
              />
            </ActionIcon>
          </Link>

          <Link to="https://www.instagram.com/" target="blank">
            <ActionIcon
              size="lg"
              variant="gradient"
              radius="sm"
              gradient={{
                from: " #c13584",
                to: " #f56040",
                to: "#fcaf45",
                deg: 135,
              }}>
              <IconBrandInstagram size="2rem" stroke={1.5} />
            </ActionIcon>
          </Link>
        </Group>
      </Box>
    </Box>
  );
}
