import clsx from "clsx";
import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(`rounded-lg transition duration-200`, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
