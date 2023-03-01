import React from "react";

const CustomBtn = (props) => {
  return (
    <button type={props.type} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default CustomBtn;
