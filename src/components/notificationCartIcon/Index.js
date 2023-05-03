import React from "react";
import { Text, Box } from "@mantine/core";

const NotificationIcon = ({ box, text, orders }) => {
  console.log("icon", orders);
  return (
    <Box className={box}>
      <Text className={text}>{orders}</Text>
    </Box>
  );
};

export default NotificationIcon;
