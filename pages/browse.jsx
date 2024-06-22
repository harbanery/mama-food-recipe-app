import Container from "../components/base/Container";
import Head from "next/head";
import Navbar from "../components/module/Navbar";
import SearchBar from "../components/base/SearchBar";
import Link from "next/link";
import Button from "../components/base/Button";
import {
  BiChevronLeft,
  BiChevronRight,
  BiFilter,
  BiSortDown,
} from "react-icons/bi";
import { getAllRecipes, getTotalRecipesCount } from "../services/recipes";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";

export async function getServerSideProps(context) {
  const { query } = context;
  const { search = "", page = 1, sort = "created_at", order = "desc" } = query;
  const limit = 20;

  try {
    const [resultRecipes, recipesCount] = await Promise.all([
      getAllRecipes({
        keyword: search,
        limit,
        page: parseInt(page, 10),
        sorting: sort,
        orderBy: order,
      }),
      getTotalRecipesCount({ keyword: search, limit }),
    ]);

    if (!resultRecipes || !recipesCount) {
      throw new Error("Failed to fetch data");
    }

    return {
      props: {
        recipes: resultRecipes.data,
        search,
        page: parseInt(page, 10),
        totalPage: recipesCount.total,
        sort,
        order,
        limit,
        status: "success",
        error: null,
      },
    };
  } catch (error) {
    console.error("Failed to fetch popular recipes:", error);
    return {
      props: {
        recipes: [],
        search,
        page: parseInt(page, 10),
        totalPage: page,
        sort,
        order,
        limit,
        status: "failed",
        error: "Failed to fetch popular recipes",
      },
    };
  }
}

const BrowsePage = ({
  recipes,
  search,
  page,
  totalPage,
  sort,
  order,
  limit,
  status,
  error,
}) => {
  return (
    <Container>
      <Head>
        <title>Browsing Recipes - Mama Recipe</title>
      </Head>

      <Navbar className={`fixed top-0 bg-recipe-yellow-normal`} />

      <Container className={`pt-48 bg-recipe-yellow-light py-6 min-h-screen`}>
        <section className="w-full flex flex-col lg:flex-row gap-2 lg:gap-10 justify-between px-10 sm:px-[135px] my-auto">
          <SearchBar />
          <ParamTools sort={sort} order={order} />
        </section>
        <BrowseData
          keyword={search}
          data={recipes}
          status={status}
          error={error}
        />
        <Pagination
          data={recipes}
          limit={limit}
          status={status}
          page={page}
          totalPage={totalPage}
        />
      </Container>
    </Container>
  );
};

const ParamTools = ({ sort, order }) => {
  const router = useRouter();
  const dropdownRef = useRef(null);

  const handleOrder = () => {
    let selectOrder = "";
    if (order == "asc") {
      selectOrder = "desc";
    } else {
      selectOrder = "asc";
    }
    const currentPath = router.pathname;
    const query = router.query;
    if (query.search || query.page || query.sort) {
      router.push({
        pathname: currentPath,
        query: { ...query, order: selectOrder },
      });
    } else {
      router.push(`${currentPath}?order=${selectOrder}`);
    }
  };

  const handleSort = (sortOption) => {
    const currentPath = router.pathname;
    const query = router.query;
    query.sort = sortOption;
    router.push({
      pathname: currentPath,
      query: { ...query },
    });
    document.getElementById("toggle-drop-down").checked = false;
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      document.getElementById("toggle-drop-down").checked = false;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex gap-1">
      <div
        ref={dropdownRef}
        className="w-full lg:w-[92px] h-[76px] sm:h-[92px] relative z-50"
      >
        <input type="checkbox" id="toggle-drop-down" className="hidden peer" />
        <label
          htmlFor="toggle-drop-down"
          className="w-full h-full bg-white rounded-none flex justify-center items-center cursor-pointer"
        >
          <BiFilter className="text-4xl text-recipe-obsidian mx-auto" />
        </label>
        <div className="w-[150%] sm:w-full lg:w-[200%] h-auto bg-white border border-recipe-yellow-normal shadow-lg rounded-none lg:absolute lg:right-0 lg:top-[100px] hidden peer-checked:block">
          <Button
            onClick={() => handleSort("title")}
            className="w-full py-5 border-b border-recipe-yellow-normal rounded-none"
            disabled={sort == "title" ? true : false}
          >
            Title
          </Button>
          <Button
            onClick={() => handleSort("created_at")}
            className="w-full py-5 border-b border-recipe-yellow-normal rounded-none"
            disabled={sort == "created_at" ? true : false}
          >
            Date Created
          </Button>
          <Button
            onClick={() => handleSort("updated_at")}
            className="w-full py-5 border-recipe-yellow-normal rounded-none"
            disabled={sort == "updated_at" ? true : false}
          >
            Date Updated
          </Button>
        </div>
      </div>
      <Button
        onClick={handleOrder}
        className={`w-full lg:w-[92px] h-[76px] sm:h-[92px] bg-white rounded-none`}
      >
        <BiSortDown
          className={`text-4xl text-recipe-obsidian mx-auto ${
            order == "desc" ? `rotate-0` : `rotate-180`
          } transition-transform duration-500 ease-in-out`}
        />
      </Button>
    </div>
  );
};

const Pagination = ({ data, status, page, totalPage }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    if (page > 1) {
      const prevPage = page - 1;
      const currentPath = router.pathname;
      const query = router.query;
      if (query.search || query.sort || query.order) {
        router.push({
          pathname: currentPath,
          query: { ...query, page: prevPage.toString() },
        });
      } else {
        router.push(`${currentPath}?page=${prevPage}`);
      }
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      const nextPage = page + 1;
      const currentPath = router.pathname;
      const query = router.query;
      if (query.search || query.sort || query.order) {
        router.push({
          pathname: currentPath,
          query: { ...query, page: nextPage.toString() },
        });
      } else {
        router.push(`${currentPath}?page=${nextPage}`);
      }
    }
  };

  const handlePage = (selectedPage) => {
    const currentPath = router.pathname;
    const query = router.query;
    if (query.search || query.sort || query.order) {
      router.push({
        pathname: currentPath,
        query: { ...query, page: selectedPage.toString() },
      });
    } else {
      router.push(`${currentPath}?page=${selectedPage}`);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];

    if (isMobile) {
      buttons.push(
        <Button
          key={1}
          className={`font-medium rounded-none w-[43px] h-full ${
            page === 1 ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => handlePage(1)}
        >
          1
        </Button>
      );

      if (page > 2) {
        buttons.push(
          <span
            key="dots1"
            className="flex justify-center items-center w-[32px] h-full text-center"
          >
            ...
          </span>
        );
      }

      if (page !== totalPage && page !== 1) {
        buttons.push(
          <Button
            key={page}
            className={`font-medium rounded-none w-[43px] h-full bg-gray-200`}
            onClick={() => handlePage(page)}
          >
            {page}
          </Button>
        );
      }

      if (page < totalPage - 1) {
        buttons.push(
          <span
            key="dots2"
            className="flex justify-center items-center w-[32px] h-full text-center"
          >
            ...
          </span>
        );
      }

      if (totalPage > 1) {
        buttons.push(
          <Button
            key={totalPage}
            className={`font-medium rounded-none w-[43px] h-full ${
              page === totalPage ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => handlePage(totalPage)}
          >
            {totalPage}
          </Button>
        );
      }
    } else {
      buttons.push(
        <Button
          key={1}
          className={`font-medium rounded-none w-[76px] h-full ${
            page === 1 ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => handlePage(1)}
        >
          1
        </Button>
      );

      if (page > 3 && totalPage > 4) {
        buttons.push(
          <span
            key="dots1"
            className="flex justify-center items-center w-[76px] h-full text-center"
          >
            ...
          </span>
        );
      }

      if (page === 1) {
        if (totalPage > 1) {
          buttons.push(
            <Button
              key={2}
              className={`font-medium rounded-none w-[76px] h-full ${
                page === 2 ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handlePage(2)}
            >
              2
            </Button>
          );
        }
        if (totalPage > 2) {
          buttons.push(
            <Button
              key={3}
              className={`font-medium rounded-none w-[76px] h-full ${
                page === 3 ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handlePage(3)}
            >
              3
            </Button>
          );
        }
      }

      if (page > 1 && page < totalPage) {
        if (page > 2) {
          buttons.push(
            <Button
              key={page - 1}
              className={`font-medium rounded-none w-[76px] h-full ${
                page === page - 1 ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handlePage(page - 1)}
            >
              {page - 1}
            </Button>
          );
        }

        buttons.push(
          <Button
            key={page}
            className={`font-medium rounded-none w-[76px] h-full bg-gray-200`}
            onClick={() => handlePage(page)}
          >
            {page}
          </Button>
        );

        if (page < totalPage - 1) {
          buttons.push(
            <Button
              key={page + 1}
              className={`font-medium rounded-none w-[76px] h-full ${
                page === page + 1 ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handlePage(page + 1)}
            >
              {page + 1}
            </Button>
          );
        }
      }

      if (page === totalPage) {
        if (totalPage > 3) {
          buttons.push(
            <Button
              key={totalPage - 2}
              className={`font-medium rounded-none w-[76px] h-full ${
                page === totalPage - 2 ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handlePage(totalPage - 2)}
            >
              {totalPage - 2}
            </Button>
          );
        }
        if (totalPage > 2) {
          buttons.push(
            <Button
              key={totalPage - 1}
              className={`font-medium rounded-none w-[76px] h-full ${
                page === totalPage - 1 ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handlePage(totalPage - 1)}
            >
              {totalPage - 1}
            </Button>
          );
        }
      }

      if (page < totalPage - 2 && totalPage > 4) {
        buttons.push(
          <span
            key="dots2"
            className="flex justify-center items-center w-[76px] h-full text-center"
          >
            ...
          </span>
        );
      }

      if (totalPage > 1) {
        buttons.push(
          <Button
            key={totalPage}
            className={`font-medium rounded-none w-[76px] h-full ${
              page === totalPage ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => handlePage(totalPage)}
          >
            {totalPage}
          </Button>
        );
      }
    }

    return buttons;
  };

  if (status != "failed" && data.length != 0) {
    return (
      <div className="w-full flex justify-center items-center gap-[14px] text-recipe-dark">
        <Button
          onClick={handlePrev}
          className={`font-medium text-3xl sm:text-5xl rounded-none bg-white w-[32px] h-[32px] sm:w-[76px] sm:h-[76px]`}
        >
          <BiChevronLeft className=" mx-auto" />
        </Button>
        <div className="flex justify-between items-center gap-[14px] font-medium text-xl sm:text-4xl text-center h-[43px] sm:h-[76px]">
          {renderPageButtons()}
        </div>
        <Button
          onClick={handleNext}
          className={`font-medium text-3xl sm:text-5xl rounded-none bg-white w-[32px] h-[32px] sm:w-[76px] sm:h-[76px]`}
        >
          <BiChevronRight className=" mx-auto" />
        </Button>
      </div>
    );
  }
};

const BrowseData = ({ keyword, data, status, error }) => {
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
      {keyword && (
        <h2 className=" font-normal text-2xl sm:text-4xl">
          Search Results for &quot;{keyword}&quot;
        </h2>
      )}
      <ListBrowseRecipe recipes={data} />
    </section>
  );
};

const ListBrowseRecipe = ({ recipes }) => {
  return (
    <div className="flex flex-wrap justify-start gap-10 sm:gap-20 lg:gap-14 xl:gap-[42px] 2xl:gap-14">
      {recipes.map((recipe) => (
        <Link
          href={`/recipe/${recipe.id}`}
          key={recipe.id}
          className={`bg-white rounded-[15px] w-full md:w-2/5 lg:w-[28%] xl:w-1/6 after:content-[""] after:block after:pb-[100%] relative overflow-hidden transition-shadow duration-500 hover:shadow-lg`}
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
          <h2 className="absolute rounded-[15px] bg-[#ffffffd8] w-5/6 p-2 left-0 bottom-0 m-1 font-medium text-base lg:text-lg xl:text-xl 2xl:text-[28px] 2xl:leading-10 text-recipe-dark ">
            {recipe.title}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default BrowsePage;
