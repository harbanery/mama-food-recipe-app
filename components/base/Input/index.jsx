import React from "react";

const Input = ({ children, error, type, ...props }) => {
  if (type == `textarea`) {
    return (
      <textarea
        className={`p-10 w-full h-80 ${
          error
            ? `bg-red-200 border-red-400`
            : `focus:border-recipe-yellow-normal border-recipe-ice bg-recipe-ice`
        } border-4 rounded-[15px] outline-none font-normal placeholder:font-normal text-lg md:text-2xl placeholder:text-lg md:placeholder:text-2xl text-recipe-corral placeholder:text-recipe-corral transition duration-200 ease-in-out`}
        {...props}
      ></textarea>
    );
  }
  if (type == `file`) {
    return <input id="file-upload" type="file" className="hidden" {...props} />;
  }
  return (
    <input
      className={`p-10 w-full ${
        error
          ? `bg-red-200 border-red-400`
          : `focus:border-recipe-yellow-normal border-recipe-ice bg-recipe-ice`
      } border-4 rounded-[15px] outline-none font-normal placeholder:font-normal text-lg md:text-2xl placeholder:text-lg md:placeholder:text-2xl text-recipe-corral placeholder:text-recipe-corral transition duration-200 ease-in-out`}
      type={type}
      {...props}
    />
  );
};

export default Input;
