import React from "react";

const Input = ({ className, children, error, type, ...props }) => {
  if (type == `textarea`) {
    return <div>TextArea</div>;
  }
  return <div>Input</div>;
};

export default Input;
