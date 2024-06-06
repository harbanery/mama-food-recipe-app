import { useSearchParams } from "next/navigation";
import Container from "../components/base/Container";
import Head from "next/head";
import Navbar from "../components/module/Navbar";
import SearchBar from "../components/base/SearchBar";
import Link from "next/link";
import { useRecipesbySearch } from "../hooks";
import style from "../styles/Search.module.css";
import Button from "../components/base/Button";
import { useState } from "react";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("title");
  const [limitData, setLimitData] = useState(20);
  const { data, status, error } = useRecipesbySearch(keyword, limitData);

  const handlePage = () => {
    setLimitData((prevKey) => prevKey + 20);
  };

  return (
    <Container>
      <Head>
        <title>Search {keyword ? `"${keyword}"` : ``} - Mama Recipe</title>
      </Head>

      <Navbar className={`fixed top-0 bg-recipe-yellow-normal`} />

      <Container className={`pt-48 bg-recipe-yellow-light py-6 min-h-screen`}>
        <section className=" px-10 sm:px-[135px] w-full my-auto">
          <SearchBar />
        </section>
        <SearchPage
          keyword={keyword}
          data={data}
          status={status}
          error={error}
        />
        <LoadMoreButton
          limit={limitData}
          data={data}
          status={status}
          callback={handlePage}
        />
      </Container>
    </Container>
  );
};

const LoadMoreButton = ({ data, limit, status, callback }) => {
  if (status != "loading" && status != "failed") {
    if (data.length != 0 && data.length == limit) {
      return (
        <div className="mx-10 sm:mx-[135px] flex justify-center">
          <Button
            onClick={callback}
            className={`bg-recipe-yellow-normal hover:bg-recipe-yellow-dark text-white w-1/6 py-5`}
          >
            Load More
          </Button>
        </div>
      );
    }
  }
};

const SearchPage = ({ keyword, data, status, error }) => {
  if (status == "loading")
    return (
      <section className="px-10 py-36 sm:px-[135px] flex flex-col gap-6 justify-center items-center">
        <div className={`${style.loader}`}></div>
        <h1 className="font-normal text-4xl">Loading...</h1>
      </section>
    );
  if (status == "failed")
    return (
      <section className="px-10 py-36 sm:px-[135px] flex flex-col gap-6 justify-center items-center">
        <h1 className="font-normal text-4xl text-red-800">Error: {error}</h1>
      </section>
    );

  if (data.length == 0)
    return (
      <section className="px-10 py-36 sm:px-[135px] flex flex-col gap-6 justify-center items-center">
        <h1 className="font-normal text-4xl">
          &quot;{keyword}&quot; not found!
        </h1>
      </section>
    );

  return (
    <section className="px-10 pt-7 pb-24 sm:px-[135px] flex flex-col gap-12">
      <h2 className=" font-normal text-2xl sm:text-4xl">
        Search Results for &quot;{keyword}&quot;
      </h2>
      <ListSearchRecipe recipes={data} />
    </section>
  );
};

const ListSearchRecipe = ({ recipes }) => {
  return (
    <div className="flex flex-wrap justify-start gap-10 sm:gap-20 lg:gap-14 xl:gap-[42px] 2xl:gap-14">
      {recipes.map((recipe) => (
        <Link
          href={`/recipe/${recipe.id}`}
          key={recipe.id}
          className={`bg-white rounded-[15px] w-full md:w-2/5 lg:w-[28%] xl:w-1/6 after:content-[""] after:block after:pb-[100%] relative overflow-hidden`}
        >
          <img
            className=" absolute w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300 ease-in-out"
            src={
              recipe.image && recipe.image.startsWith("https://")
                ? recipe.image
                : `/assets/icons/Default_Recipe_Image.png`
            }
            alt={recipe.title}
          />
          <h2 className="absolute rounded-[15px] bg-[#ffffffd8] w-5/6 p-2 left-0 bottom-0 m-1 font-medium text-base lg:text-lg xl:text-xl 2xl:text-[28px] leading-10 text-recipe-dark ">
            {recipe.title}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
