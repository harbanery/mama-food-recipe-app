import React, { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ className }) => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      let currentPath = router.pathname;
      if (currentPath != "/browse") {
        currentPath = "/browse";
      }
      const query = router.query || {};
      if (query.page || query.sort || query.order) {
        router.push({
          pathname: currentPath,
          query: { ...query, search: keyword },
        });
      } else {
        router.push(
          `${currentPath}?search=${encodeURIComponent(keyword.trim())}`,
          {
            scroll: false,
          }
        );
      }
    }
  };

  return (
    <div className={clsx(`w-full h-auto bg-white`, className)}>
      <div className="flex items-center justify-between gap-3 p-4 sm:py-6 sm:px-12 group transition-all duration-300 focus-within:gap-0">
        <BiSearch
          className={`text-2xl text-recipe-obsidian transition-all duration-300 ease-in-out group-focus-within:opacity-0 group-focus-within:w-0`}
        />
        <form
          onSubmit={handleSearch}
          className="w-full transition-all duration-300 ease-in-out"
        >
          <input
            className="w-full font-light text-xl text-recipe-blue placeholder:text-recipe-blue placeholder:font-light placeholder:text-xl p-2 border-none outline-none transition-all duration-300 ease-in-out group-focus-within:w-full"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Recipe"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
