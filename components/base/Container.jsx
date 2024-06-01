import clsx from "clsx";
import React from "react";

const Container = ({ children, className }) => {
  return (
    <main
      className={clsx(
        "max-w-[1920px] w-full mx-auto p-0 font-cereal",
        className
      )}
    >
      {children}
    </main>
  );
};

export default Container;
