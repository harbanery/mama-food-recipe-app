import React, { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const SearchBar = ({ className }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?title=${encodeURIComponent(query.trim())}`, {
        scroll: false,
      });
    }
  };

  return (
    <div className={clsx(`w-full h-auto bg-white`, className)}>
      <div className="flex items-center justify-between gap-3 p-4 sm:py-6 sm:px-12">
        <div className="w-6 h-6">
          <img
            className="w-full h-full"
            src="/assets/icons/Group 687.png"
            alt="Search Icon"
          />
        </div>
        <form onSubmit={handleSearch} className="w-full">
          <input
            className="w-full font-light text-xl text-recipe-blue placeholder:text-recipe-blue placeholder:font-light placeholder:text-xl p-2 border-none outline-none"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Recipe"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
