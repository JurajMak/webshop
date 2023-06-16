import React from "react";
import { Chip } from "@mantine/core";

export default function CustomChip({ ...props }) {
  const styles = {
    label: {
      "&[data-checked]": {
        "&, &:hover": {
          // backgroundColor: "#979B9F",
          backgroundColor: "#062343",

          color: "#fff",
        },
        "&[data-variant=outline]": {
          outline: "none",
          border: "1px solid rgba(138, 135, 125, 0.3);",
        },
      },

      span: {
        display: "none",
      },
    },
  };
  return <Chip sx={styles} {...props} />;
}
