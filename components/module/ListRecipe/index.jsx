import React from "react";

const ListRecipe = ({ recipes }) => {
  return (
    <div className="flex flex-wrap justify-between gap-14">
      {recipes.map((data, index) => (
        <div
          key={index}
          className="rounded-[15px] w-[30%] relative overflow-hidden"
        >
          <img
            className=" w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
            src={data.image}
            alt={data.name}
          />
          <h2 className="absolute left-10 bottom-10 font-medium text-[28px] leading-10 text-recipe-dark w-1/3">
            {data.name}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ListRecipe;
