import React from "react";
import { icons } from "./icons";

const Icon = ({ size, name }) => {
  return icons[name]({ size });
};

export default Icon;
