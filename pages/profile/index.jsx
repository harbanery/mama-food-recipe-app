import React, { useState } from "react";
import Container from "../../components/base/Container";
import Head from "next/head";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import {
  BiBookmark,
  BiChevronDown,
  BiLike,
  BiNavigation,
  BiPencil,
  BiTrash,
} from "react-icons/bi";
import Button from "../../components/base/Button";
import {
  deleteLikeRecipe,
  deleteRecipe,
  deleteSaveRecipe,
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

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

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
  const [visible, setVisible] = useState(false);

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
        <section className="pt-24 relative">
          <ul className="mx-10 sm:mx-[143px] flex justify-around min-[520px]:justify-between xl:justify-start items-center gap-12 min-[520px]:gap-16 lg:gap-24 font-medium text-xl sm:text-2xl text-recipe-corral">
            <li className={`block md:hidden`}>
              <Button className={`text-black`}>
                {recipeMenu == `self` && `My Recipe`}
                {recipeMenu == `saved` && `Saved Recipe`}
                {recipeMenu == `liked` && `Liked Recipe`}
              </Button>
            </li>
            <li className={`block md:hidden`}>
              <Button>
                <BiChevronDown
                  onClick={() =>
                    visible === false ? setVisible(true) : setVisible(false)
                  }
                  className="text-4xl"
                />
              </Button>
            </li>
            <li className=" hidden md:block">
              <Button
                className={`${
                  recipeMenu === `self` ? `text-black` : `hover:text-black`
                }`}
                onClick={() => setRecipeMenu(`self`)}
              >
                My Recipe
              </Button>
            </li>
            <li className=" hidden md:block">
              <Button
                className={`${
                  recipeMenu === `saved` ? `text-black` : `hover:text-black`
                }`}
                onClick={() => setRecipeMenu(`saved`)}
              >
                Saved Recipe
              </Button>
            </li>
            <li className=" hidden md:block">
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
          {visible && (
            <div
              className={`block md:hidden px-10 sm:px-[143px] absolute w-full z-50`}
            >
              <div className="w-full bg-recipe-yellow-normal rounded-lg shadow-lg font-medium text-xl text-recipe-dark ">
                <Button
                  onClick={() => {
                    setRecipeMenu(`self`);
                    setVisible(false);
                  }}
                  className={`${
                    recipeMenu === `self` && `hidden`
                  } w-full p-5 hover:text-black`}
                >
                  My Recipe
                </Button>
                <Button
                  onClick={() => {
                    setRecipeMenu(`saved`);
                    setVisible(false);
                  }}
                  className={`${
                    recipeMenu === `saved` && `hidden`
                  } w-full p-5 hover:text-black`}
                >
                  Saved Recipe
                </Button>
                <Button
                  onClick={() => {
                    setRecipeMenu(`liked`);
                    setVisible(false);
                  }}
                  className={`${
                    recipeMenu === `liked` && `hidden`
                  } w-full p-5 hover:text-black`}
                >
                  Liked Recipe
                </Button>
              </div>
            </div>
          )}
          <div className="border border-[#DFDFDF] my-8" />
          {recipeMenu === `self` && (
            <MyRecipe myRecipes={myRecipes} token={token} />
          )}
          {recipeMenu === `saved` && (
            <SavedRecipe savedRecipes={savedRecipes} token={token} />
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

      if (result.message === "Internal Server Error") {
        setAlert({
          status: "failed",
          message:
            "You can't delete this recipe because someone liked or saved this recipe.",
        });
        setAlertKey((prevKey) => prevKey + 1);
        return;
      }

      setAlert({
        status: "success",
        message: result.message,
      });
      setAlertKey((prevKey) => prevKey + 1);

      router.replace(router.asPath, undefined, { scroll: false });
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
      className={`mx-10 sm:mx-[136px] flex flex-wrap ${
        myRecipes.length == 0 && `justify-center`
      } gap-8`}
    >
      <Alert status={alert.status} message={alert.message} count={alertKey} />
      {myRecipes.length == 0 ? (
        <h1 className="font-medium text-3xl md:text-6xl my-24">
          Not Available
        </h1>
      ) : (
        myRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="w-full lg:w-[45%] xl:w-[23%] h-64 rounded-[10px] overflow-hidden relative"
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

const SavedRecipe = ({ savedRecipes = [], token }) => {
  const router = useRouter();
  const [alert, setAlert] = useState({
    status: `idle`,
    message: ``,
  });
  const [alertKey, setAlertKey] = useState(0);

  const handleRead = (id) => {
    router.push(`/recipe/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteSaveRecipe({ id, token });

      setAlert({
        status: "success",
        message: result.message,
      });
      setAlertKey((prevKey) => prevKey + 1);

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
      className={`mx-10 sm:mx-[136px] flex flex-wrap ${
        savedRecipes.length == 0 && `justify-center`
      } gap-8`}
    >
      <Alert status={alert.status} message={alert.message} count={alertKey} />
      {savedRecipes.length == 0 ? (
        <h1 className="font-medium text-3xl md:text-6xl my-24">
          Not Available
        </h1>
      ) : (
        savedRecipes.map((save) => (
          <div
            key={save.id}
            className="w-full lg:w-[45%] xl:w-[23%] h-64 rounded-[10px] overflow-hidden relative"
          >
            <img
              className="w-full h-full object-cover object-center"
              src={
                save.recipe.image && save.recipe.image.startsWith("https://")
                  ? save.recipe.image
                  : `/assets/icons/Default_Recipe_Image.png`
              }
              alt={save.recipe.title}
            />
            <span className="absolute left-0 bottom-0 rounded-[10px] bg-[#ffffffd8] p-2 m-5 text-recipe-dark">
              {save.recipe.title}
            </span>
            <div className="absolute right-0 top-0 m-3 flex justify-end gap-2">
              <Button
                className={`w-10 h-10 bg-white border hover:bg-recipe-yellow-normal border-recipe-yellow-normal text-recipe-yellow-normal hover:text-white `}
                onClick={() => handleRead(save.recipe_id)}
              >
                <BiNavigation className="mx-auto text-2xl" />
              </Button>
              <Button
                className={`w-10 h-10 border bg-recipe-yellow-normal hover:bg-recipe-yellow-dark border-recipe-yellow-normal text-white `}
                onClick={() => handleDelete(save.id)}
              >
                <BiBookmark className="mx-auto text-2xl" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const LikedRecipe = ({ likedRecipes = [], token }) => {
  const router = useRouter();
  const [alert, setAlert] = useState({
    status: `idle`,
    message: ``,
  });
  const [alertKey, setAlertKey] = useState(0);

  const handleRead = (id) => {
    router.push(`/recipe/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteLikeRecipe({ id, token });

      setAlert({
        status: "success",
        message: result.message,
      });
      setAlertKey((prevKey) => prevKey + 1);

      router.replace(router.asPath, undefined, { scroll: false });
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
      className={`mx-10 sm:mx-[136px] flex flex-wrap ${
        likedRecipes.length == 0 && `justify-center`
      } gap-8`}
    >
      <Alert status={alert.status} message={alert.message} count={alertKey} />
      {likedRecipes.length == 0 ? (
        <h1 className="font-medium text-3xl md:text-6xl my-24">
          Not Available
        </h1>
      ) : (
        likedRecipes.map((like) => (
          <div
            key={like.id}
            className="w-full lg:w-[45%] xl:w-[23%] h-64 rounded-[10px] overflow-hidden relative"
          >
            <img
              className="w-full h-full object-cover object-center"
              src={
                like.recipe.image && like.recipe.image.startsWith("https://")
                  ? like.recipe.image
                  : `/assets/icons/Default_Recipe_Image.png`
              }
              alt={like.recipe.title}
            />
            <span className="absolute left-0 bottom-0 rounded-[10px] bg-[#ffffffd8] p-2 m-5 text-recipe-dark">
              {like.recipe.title}
            </span>
            <div className="absolute right-0 top-0 m-3 flex justify-end gap-2">
              <Button
                className={`w-10 h-10 bg-white border hover:bg-recipe-yellow-normal border-recipe-yellow-normal text-recipe-yellow-normal hover:text-white `}
                onClick={() => handleRead(like.recipe_id)}
              >
                <BiNavigation className="mx-auto text-2xl" />
              </Button>
              <Button
                className={`w-10 h-10 border bg-recipe-yellow-normal hover:bg-recipe-yellow-dark border-recipe-yellow-normal text-white `}
                onClick={() => handleDelete(like.id)}
              >
                <BiLike className="mx-auto text-2xl" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
