import Head from "next/head";
import SearchBar from "../components/base/SearchBar";
import Navbar from "../components/module/Navbar";
import Footer from "../components/module/Footer";
import Link from "next/link";
import Container from "../components/base/Container";
import Button from "../components/base/Button";
import { getAllRecipes } from "../services/recipes";
import clsx from "clsx";

export async function getServerSideProps() {
  try {
    const [resultPopularRecipes, resultPopularForUser, resultNewestRecipe] =
      await Promise.all([
        getAllRecipes({ limit: 6 }),
        getAllRecipes({ limit: 2 }),
        getAllRecipes({ limit: 1, sorting: `created_at`, orderBy: `desc` }),
      ]);

    if (!resultPopularRecipes || !resultPopularForUser) {
      throw new Error("Failed to fetch data");
    }

    return {
      props: {
        popularRecipes: resultPopularRecipes.data,
        popularForUser: resultPopularForUser.data,
        newestRecipe: resultNewestRecipe.data,
      },
    };
  } catch (error) {
    console.error("Failed to fetch popular recipes:", error);
    return {
      props: {
        popularRecipes: [],
        error: "Failed to fetch popular recipes",
      },
    };
  }
}

export default function Home({ popularRecipes, popularForUser, newestRecipe }) {
  return (
    <Container>
      <Head>
        <title>Home - Mama Recipe</title>
      </Head>

      <Navbar className={`absolute top-0`} home={true} />

      <Container
        className={`bg-recipe-yellow-light flex justify-between h-screen`}
      >
        <section className=" px-10 sm:px-[135px] w-full my-auto">
          <div
            className={`font-bold text-center md:text-left text-4xl md:text-6xl lg:text-7xl leading-normal lg:leading-[90px] text-recipe-blue w-full lg:w-[800px] mb-10`}
          >
            <h1 className="">Discover Recipe</h1>
            <h1 className="">& Delicious Food</h1>
          </div>

          <SearchBar className={`lg:w-5/6 xl:w-[670px] `} />
        </section>

        <aside className="hidden xl:block w-5/12 relative bg-recipe-yellow-normal">
          <img
            className="absolute min-w-[370px] w-full top-60 2xl:top-20 -left-52 2xl:-left-72 z-50 transition-transform duration-300 ease-in-out"
            src="/assets/group icons/Group 700.png"
            alt="Food Image"
          />
        </aside>
      </Container>

      <Container className={`bg-recipe-yellow-light hidden md:block`}>
        <section className="py-20 flex flex-col gap-24 xl:gap-48 ">
          <SubTitle className={`px-10 sm:px-[135px] `}>
            Popular For You !
          </SubTitle>

          <PopularForYou recipes={popularForUser} />
        </section>
      </Container>

      <Container className={`bg-recipe-yellow-light relative`}>
        <div className="hidden lg:block absolute left-0 bottom-0 2xl:bottom-32 w-1/4 h-2/4 bg-recipe-yellow-normal"></div>
        <section className="px-10 sm:px-[135px] py-20 flex flex-col gap-24 xl:gap-48 ">
          <SubTitle>New Recipe</SubTitle>

          <NewestRecipe recipe={newestRecipe[0]} />
        </section>
      </Container>

      <Container className={`bg-recipe-yellow-light`}>
        <section className="px-10 py-14 sm:px-[135px] flex flex-col gap-24">
          <SubTitle>Popular Recipe</SubTitle>

          <ListPopularRecipe recipes={popularRecipes} />
          <Link href={`/browse`} className="mx-auto">
            <Button
              className={`px-[50px] py-4 bg-recipe-yellow-normal hover:bg-recipe-yellow-dark text-white font-medium text-2xl`}
            >
              Load More
            </Button>
          </Link>
        </section>
      </Container>

      <Footer />
    </Container>
  );
}

const SubTitle = ({ className, children }) => {
  return (
    <div
      className={clsx("h-36 flex justify-start items-center gap-8", className)}
    >
      <div className="w-[25px] h-full bg-recipe-yellow-normal"></div>
      <h2 className=" font-medium text-5xl text-recipe-dark">{children}</h2>
    </div>
  );
};

const PopularForYou = ({ recipes }) => {
  return (
    <div className="flex gap-10">
      {recipes.map((recipe) => (
        <Link
          href={`/recipe/${recipe.id}`}
          key={recipe.id}
          className="w-1/3 relative"
        >
          <div className="w-full bg-white overflow-hidden rounded-[20px] transition-shadow duration-500 hover:shadow-lg">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden">
              <img
                className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out transform hover:scale-110"
                src={
                  recipe.image && recipe.image.startsWith("https://")
                    ? recipe.image
                    : `/assets/icons/Default_Recipe_Image.png`
                }
                alt={recipe.title}
              />
            </div>
          </div>
          <h2 className="absolute rounded-[15px] bg-[#ffffffd8] p-2 2xl:p-4 left-0 bottom-0 m-5 lg:m-10 2xl:m-[60px] font-medium text-base lg:text-lg xl:text-xl 2xl:text-[42px] 2xl:leading-10 text-recipe-dark ">
            {recipe.title}
          </h2>
        </Link>
      ))}
    </div>
  );
};

const NewestRecipe = ({ recipe }) => {
  return (
    <div className="flex flex-col lg:flex-row flex-nowrap justify-between gap-20 xl:gap-40 2xl:gap-60">
      <div className="w-full xl:w-1/2 relative">
        <div className="w-full bg-white overflow-hidden rounded-[20px] transition-shadow duration-500 hover:shadow-lg">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden">
            <img
              className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out transform hover:scale-110"
              src={
                recipe.image && recipe.image.startsWith("https://")
                  ? recipe.image
                  : `/assets/icons/Default_Recipe_Image.png`
              }
              alt={recipe.title}
            />
          </div>
        </div>
      </div>
      <div className="mt-0 2xl:mt-20 w-full xl:w-1/2">
        <h1 className="font-medium text-4xl sm:text-[54px] sm:leading-[72px]">
          {recipe.title}
        </h1>
        <div className="w-16 2xl:w-[100px] border-2 border-recipe-yellow-dark mt-6 mb-10"></div>
        <p className="font-base text-2xl leading-8 mb-10">
          {recipe.title} is a brand new and exciting recipe. You should
          definitely check it out!
        </p>
        <Link href={`/recipe/${recipe.id}`}>
          <Button
            className={`px-[50px] py-5 bg-recipe-yellow-normal hover:bg-recipe-yellow-dark text-white font-medium text-base mx-auto`}
          >
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
};

const ListPopularRecipe = ({ recipes }) => {
  return (
    <div className="flex flex-wrap justify-around gap-14">
      {recipes.map((recipe) => (
        <Link
          href={`/recipe/${recipe.id}`}
          key={recipe.id}
          className={`bg-white rounded-[15px] w-full md:w-2/5 lg:w-[28%] xl:w-[29.5%] after:content-[""] after:block after:pb-[100%] relative overflow-hidden transition-shadow duration-500 hover:shadow-lg`}
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
          <h2 className="absolute rounded-[15px] bg-[#ffffffd8] p-2 left-0 bottom-0 m-5 md:m-2 xl:m-5 2xl:m-10 font-medium text-base lg:text-lg xl:text-xl 2xl:text-[28px] 2xl:leading-10 text-recipe-dark ">
            {recipe.title || `Unknown Recipe Name`}
          </h2>
        </Link>
      ))}
    </div>
  );
};
