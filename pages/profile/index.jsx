import React, { useState } from "react";
import Container from "../../components/base/Container";
import Head from "next/head";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import { BiNavigation, BiPencil, BiTrash } from "react-icons/bi";
import Button from "../../components/base/Button";
import {
  deleteRecipe,
  getLikedRecipes,
  getMyRecipes,
  getSavedRecipes,
} from "../../services/recipes";
import { getProfile } from "../../services/user";
import { parseCookies } from "../../utils/cookies";
import { useRouter } from "next/router";
import Alert from "../../components/base/Alert";

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token || null;

  try {
    // Fetch data in parallel
    const [
      resultUser,
      resultMyRecipes,
      resultSavedRecipes,
      resultLikedRecipes,
    ] = await Promise.all([
      getProfile({ token }),
      getMyRecipes({ token }),
      getSavedRecipes({ token }),
      getLikedRecipes({ token }),
    ]);

    // Check for successful responses
    if (
      !resultUser ||
      !resultMyRecipes ||
      !resultSavedRecipes ||
      !resultLikedRecipes
    ) {
      throw new Error("Failed to fetch data");
    }

    return {
      props: {
        token: token,
        user: resultUser.data,
        myRecipes: resultMyRecipes.data,
        savedRecipes: resultSavedRecipes.data,
        likedRecipes: resultLikedRecipes.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        error: "Failed to fetch data",
      },
    };
  }
}

const Profile = ({ token, user, myRecipes, savedRecipes, likedRecipes }) => {
  const [recipeMenu, setRecipeMenu] = useState(`self`);

  return (
    <Container>
      <Head>
        <title>Profile - Mama Recipe</title>
      </Head>

      <Navbar className={`absolute top-0`} />

      <Container className={`pt-48 pb-12`}>
        <section className="flex flex-col justify-center items-center gap-10">
          <div className="w-44 h-44 relative ">
            <div className=" w-full h-full rounded-[100%] border overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.1811806509.1712513101&semt=ais_user"
                alt="User Profile"
              />
            </div>
            <BiPencil className="absolute right-0 bottom-0 text-2xl text-recipe-yellow-normal" />
          </div>
          <h1 className="font-medium text-2xl ">{user.name}</h1>
        </section>
        <section className="pt-24">
          <ul className="mx-[143px] flex items-center gap-24 font-medium text-2xl text-recipe-corral">
            <li>
              <Button
                className={`${
                  recipeMenu === `self` ? `text-black` : `hover:text-black`
                }`}
                onClick={() => setRecipeMenu(`self`)}
              >
                My Recipe
              </Button>
            </li>
            <li>
              <Button
                className={`${
                  recipeMenu === `saved` ? `text-black` : `hover:text-black`
                }`}
                onClick={() => setRecipeMenu(`saved`)}
              >
                Saved Recipe
              </Button>
            </li>
            <li>
              <Button
                className={`${
                  recipeMenu === `liked` ? `text-black` : `hover:text-black`
                }`}
                onClick={() => setRecipeMenu(`liked`)}
              >
                Liked Recipe
              </Button>
            </li>
          </ul>
          <div className="border border-[#DFDFDF] my-8" />
          {recipeMenu === `self` && (
            <MyRecipe myRecipes={myRecipes} token={token} />
          )}
          {recipeMenu === `saved` && (
            <SavedRecipe savedRecipes={savedRecipes} />
          )}
          {recipeMenu === `liked` && (
            <LikedRecipe likedRecipes={likedRecipes} />
          )}
        </section>
      </Container>

      <Footer />
    </Container>
  );
};

const MyRecipe = ({ myRecipes = [], token }) => {
  const router = useRouter();
  const [alert, setAlert] = useState({
    status: `idle`,
    message: ``,
  });
  const [alertKey, setAlertKey] = useState(0);

  const handleUpdate = (id) => {
    router.push(`/recipe/update/${id}`);
  };

  const handleRead = (id) => {
    router.push(`/recipe/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteRecipe({ id, token });

      setAlert({
        status: "success",
        message: result.message,
      });

      router.replace(router.asPath);
    } catch (error) {
      setAlert({
        status: "failed",
        message: error.message,
      });
      setAlertKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <div
      className={`mx-[136px] flex flex-wrap ${
        myRecipes.length == 0 && `justify-center`
      } gap-8`}
    >
      <Alert status={alert.status} message={alert.message} count={alertKey} />
      {myRecipes.length == 0 ? (
        <h1 className="font-medium text-6xl my-24">Not Available</h1>
      ) : (
        myRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className=" w-[23%] h-64 rounded-[10px] overflow-hidden relative"
          >
            <img
              className="w-full h-full object-cover object-center"
              src={
                recipe.image && recipe.image.startsWith("https://")
                  ? recipe.image
                  : `/assets/icons/Default_Recipe_Image.png`
              }
              alt={recipe.title}
            />
            <span className="absolute left-0 bottom-0 rounded-[10px] bg-[#ffffffd8] p-2 m-5 text-recipe-dark">
              {recipe.title}
            </span>
            <div className="absolute right-0 top-0 m-3 flex justify-end gap-2">
              <Button
                className={`w-10 h-10 bg-white border hover:bg-recipe-yellow-normal border-recipe-yellow-normal text-recipe-yellow-normal hover:text-white `}
                onClick={() => handleRead(recipe.id)}
              >
                <BiNavigation className="mx-auto text-2xl" />
              </Button>
              <Button
                className={`w-10 h-10 bg-white border hover:bg-recipe-yellow-normal border-recipe-yellow-normal text-recipe-yellow-normal hover:text-white `}
                onClick={() => handleUpdate(recipe.id)}
              >
                <BiPencil className="mx-auto text-2xl" />
              </Button>
              <Button
                className={`w-10 h-10 bg-white border hover:bg-red-600 border-red-600 text-red-600 hover:text-white `}
                onClick={() => handleDelete(recipe.id)}
              >
                <BiTrash className="mx-auto text-2xl" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const SavedRecipe = ({ savedRecipes = [] }) => {
  return (
    <div
      className={`mx-[136px] flex flex-wrap ${
        savedRecipes.length == 0 && `justify-center`
      } gap-8`}
    >
      {savedRecipes.length == 0 ? (
        <h1 className="font-medium text-6xl my-24">Not Available</h1>
      ) : (
        <div className=" w-[23%] h-64 rounded-[10px] overflow-hidden relative">
          <img
            className="w-full h-full object-cover object-center"
            src="/assets/Rectangle 313.png"
            alt=""
          />
          <span className="absolute left-5 bottom-5 rounded-[10px] bg-[#ffffffd8] p-2 leading-10 text-recipe-dark">
            Saved Recipe
          </span>
        </div>
      )}
    </div>
  );
};

const LikedRecipe = ({ likedRecipes = [] }) => {
  return (
    <div
      className={`mx-[136px] flex flex-wrap ${
        likedRecipes.length == 0 && `justify-center`
      } gap-8`}
    >
      {likedRecipes.length == 0 ? (
        <h1 className="font-medium text-6xl my-24">Not Available</h1>
      ) : (
        <div className=" w-[23%] h-64 rounded-[10px] overflow-hidden relative">
          <img
            className="w-full h-full object-cover object-center"
            src="/assets/Rectangle 314.png"
            alt=""
          />
          <span className="absolute left-5 bottom-5 rounded-[10px] bg-[#ffffffd8] p-2 leading-10 text-recipe-dark">
            Liked Recipe
          </span>
        </div>
      )}
    </div>
  );
};

export default Profile;
