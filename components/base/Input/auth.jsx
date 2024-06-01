import React from "react";

const InputAuth = ({ className, children, error, type, ...props }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <span className="font-medium text-base">{children}</span>
      <input
        className="focus:border-recipe-yellow-normal focus:shadow-lg rounded-md border border-recipe-gray h-[64px] p-6 placeholder:text-recipe-gray outline-none"
        type={type}
        {...props}
      />
      {error && (
        <span className="font-medium text-xs text-red-600">{error}</span>
      )}
    </div>
  );
};

export default InputAuth;
