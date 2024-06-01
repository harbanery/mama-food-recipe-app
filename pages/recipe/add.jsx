import React, { useState } from "react";
import Container from "../../components/base/Container";
import Head from "next/head";
import Navbar from "../../components/module/Navbar";
import Button from "../../components/base/Button";
import Footer from "../../components/module/Footer";
import { BiImage } from "react-icons/bi";
import { uploadImage } from "../../services/assets";
import { addRecipe } from "../../services/recipes";
import { getToken } from "../../utils/cookies";
import { useRouter } from "next/router";
import Alert from "../../components/base/Alert";

const AddRecipe = () => {
  const router = useRouter();
  const [alert, setAlert] = useState({
    status: `idle`,
    message: ``,
  });
  const [alertKey, setAlertKey] = useState(0);
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    try {
      const { url } = await uploadImage({ file });

      setRecipe({
        ...recipe,
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
    const { token } = getToken();
    try {
      const { data, message } = await addRecipe({ data: recipe, token: token });

      setAlert({
        status: "success",
        message: message,
      });

      router.push(`/recipe/${data.id}`);
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
        <title>Add Recipe - Mama Recipe</title>
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
                <span>{recipe.image ? `Photo Uploaded` : `Add Photo`}</span>
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
              value={recipe.title}
              onChange={handleChange}
              placeholder="Title"
            />

            <textarea
              className="p-10 w-full h-80 bg-recipe-ice rounded-[15px] outline-none font-normal placeholder:font-normal text-2xl placeholder:text-2xl text-recipe-corral placeholder:text-recipe-corral"
              name="description"
              value={recipe.description}
              onChange={handleChange}
              placeholder="Ingredients"
            ></textarea>

            <Button
              onClick={handleSubmit}
              className={`rounded-[15px] w-1/3 py-5 bg-recipe-yellow-normal hover:bg-recipe-yellow-dark text-white font-medium text-base`}
            >
              Post
            </Button>
          </div>
        </div>
      </Container>

      <Footer />
    </Container>
  );
};

export default AddRecipe;
