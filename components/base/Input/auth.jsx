import React from "react";

const InputAuth = ({ className, children, error, type, ...props }) => {
  if (type === "checkbox") {
    return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            id="checkbox"
            className="accent-recipe-yellow-normal scale-125"
            type="checkbox"
            {...props}
          />
          <label htmlFor="checkbox" className=" cursor-pointer">
            {children}
          </label>
        </div>
        {error && (
          <span className="font-medium text-sm text-red-600">{error}</span>
        )}
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-3">
      <span className="font-medium text-base">{children}</span>
      <input
        className="focus-within:border-recipe-yellow-normal focus-within:shadow-lg rounded-md border border-recipe-gray h-[40px] xl:h-[64px] p-6 xl:p-6 placeholder:text-recipe-gray outline-none transition-all duration-300"
        type={type}
        {...props}
      />
      {error && (
        <span className="font-medium text-sm text-red-600">{error}</span>
      )}
    </div>
  );
};

export default InputAuth;
