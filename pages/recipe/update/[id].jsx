import React, { useState } from "react";
import Head from "next/head";
import { BiImage } from "react-icons/bi";
import { useRouter } from "next/router";
import Container from "../../../components/base/Container";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import Button from "../../../components/base/Button";
import { getRecipeById, updateRecipe } from "../../../services/recipes";
import { parseCookies } from "../../../utils/cookies";
import Alert from "../../../components/base/Alert";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { req } = context;
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token || null;

  try {
    const result = await getRecipeById({ id });

    if (!result || !result.data) {
      throw new Error("Failed to fetch recipe data");
    }

    return {
      props: {
        token: token,
        recipe: result.data,
      },
    };
  } catch (error) {
    console.error("Error fetching recipe:", error);

    return {
      notFound: true,
    };
  }
}

const UpdateRecipe = ({ token, recipe }) => {
  const router = useRouter();
  const [alert, setAlert] = useState({
    status: `idle`,
    message: ``,
  });
  const [alertKey, setAlertKey] = useState(0);
  const [updatedRecipe, setUpdatedRecipe] = useState({
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    image: recipe.image,
  });

  const handleChange = (e) => {
    setUpdatedRecipe({
      ...updatedRecipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    try {
      const { url } = await uploadImage({ file });

      console.log(url);
      setUpdatedRecipe({
        ...updatedRecipe,
        image: url,
      });
    } catch (error) {
      setAlert({
        status: "failed",
        message: error.message,
      });
      setAlertKey((prevKey) => prevKey + 1);
    }
  };

  const handleSubmit = async () => {
    // console.log(updatedRecipe);
    try {
      const { message } = await updateRecipe({
        data: updatedRecipe,
        token: token,
      });

      setAlert({
        status: "success",
        message: message,
      });

      router.push(`/profile`);
    } catch (error) {
      setAlert({
        status: "failed",
        message: error.message,
      });
      setAlertKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <Container>
      <Head>
        <title>Update Recipe - Mama Recipe</title>
      </Head>

      <Alert status={alert.status} message={alert.message} count={alertKey} />

      <Navbar className={`absolute top-0`} />

      <Container className={`pt-48 pb-24 min-h-screen`}>
        <div className="px-[310px]">
          <div className="flex flex-col justify-between items-center gap-12 mx-auto">
            <label
              htmlFor="file-upload"
              className="inline-block relative cursor-pointer p-10 w-full h-96 bg-recipe-ice rounded-[15px] outline-none font-normal text-2xl text-recipe-corral"
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <BiImage className=" text-6xl" />
                <span>
                  {updatedRecipe.image ? `Photo Uploaded` : `Add Photo`}
                </span>
              </div>
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            <input
              className="p-10 w-full bg-recipe-ice rounded-[15px] outline-none font-normal placeholder:font-normal text-2xl placeholder:text-2xl text-recipe-corral placeholder:text-recipe-corral"
              type="text"
              name="title"
              value={updatedRecipe.title}
              onChange={handleChange}
              placeholder="Title"
            />

            <textarea
              className="p-10 w-full h-80 bg-recipe-ice rounded-[15px] outline-none font-normal placeholder:font-normal text-2xl placeholder:text-2xl text-recipe-corral placeholder:text-recipe-corral"
              name="description"
              value={updatedRecipe.description}
              onChange={handleChange}
              placeholder="Ingredients"
            ></textarea>

            <Button
              onClick={handleSubmit}
              className={`rounded-[15px] w-1/3 py-5 bg-recipe-yellow-normal hover:bg-recipe-yellow-dark text-white font-medium text-base`}
            >
              Edit
            </Button>
          </div>
        </div>
      </Container>

      <Footer />
    </Container>
  );
};

export default UpdateRecipe;
