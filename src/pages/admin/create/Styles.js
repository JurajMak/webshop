import styled from "@emotion/styled";
import { createStyles } from "@mantine/core";
// import Image from "../../../assets/register.jpg";
import Image from "../../../assets/login.jpg";

export const Form = styled.form`
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  border-radius: 8px;
  padding: 20px;
  background: white;
  border: 1px solid black;
`;
export const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundSize: "cover",
    backgroundImage: `url(${Image})`,
    // "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[6],
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));
