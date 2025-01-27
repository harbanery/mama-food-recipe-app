import React, { useState } from "react";
import Container from "../../components/base/Container";
import Head from "next/head";
import Navbar from "../../components/module/Navbar";
import Button from "../../components/base/Button";
import Footer from "../../components/module/Footer";
import { BiImage } from "react-icons/bi";
import { useRouter } from "next/router";
import Input from "../../components/base/Input";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorForms } from "../../store/actions/authActions";
import { uploadImageAction } from "../../store/actions/assetActions";
import { addRecipeAction } from "../../store/actions/recipeActions";
import { parseCookies } from "../../utils/cookies";

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

  return {
    props: {
      token: token,
    },
  };
}

const AddRecipe = ({ token }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.validation);
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(clearErrorForms(name));

    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    if (!token) {
      router.push(`/login`);
      return;
    }

    const file = e.target.files[0];

    dispatch(uploadImageAction(file, recipe, setRecipe));
  };

  const handleSubmit = async () => {
    if (!token) {
      router.push(`/login`);
      return;
    }

    dispatch(addRecipeAction(recipe, token, router));
  };

  return (
    <Container>
      <Head>
        <title>Add Recipe - Mama Recipe</title>
      </Head>

      <Navbar className={`absolute top-0`} />

      <Container className={`pt-48 pb-24 min-h-screen`}>
        <div className="px-10 md:px-[135px] xl:px-[310px]">
          <div className="flex flex-col justify-between items-center gap-12 mx-auto">
            <label
              htmlFor="file-upload"
              className={`inline-block relative cursor-pointer w-full ${
                recipe.image ? `h-auto` : `h-72 min-[520px]:h-96`
              } ${
                errors.image
                  ? `bg-red-200 border-4 border-red-400`
                  : `bg-recipe-ice`
              } rounded-[15px] outline-none font-normal text-lg md:text-2xl text-recipe-corral`}
            >
              {!recipe.image ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                  <BiImage className="text-4xl md:text-6xl" />
                  <span>{`Add Photo`}</span>
                  <span>{`PNG, JPG, or JPEG`}</span>
                  <span>{`Max 2 MB`}</span>
                </div>
              ) : (
                <div className="w-full h-full rounded-[15px] overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={
                      recipe.image && recipe.image.startsWith("https://")
                        ? recipe.image
                        : `/assets/icons/Default_Recipe_Image.png`
                    }
                    alt={recipe.title}
                  />
                </div>
              )}
            </label>
            <Input id="file-upload" type="file" onChange={handleFileChange} />

            <Input
              type="text"
              name="title"
              value={recipe.title}
              error={errors.title}
              onChange={handleChange}
              placeholder="Title"
            />

            <Input
              type="textarea"
              name="description"
              value={recipe.description}
              error={errors.description}
              onChange={handleChange}
              placeholder="Ingredients"
            />

            <Button
              onClick={handleSubmit}
              className={`rounded-[15px] w-full md:w-2/3 lg:w-2/5 xl:w-1/3 py-5 bg-recipe-yellow-normal hover:bg-recipe-yellow-dark text-white font-medium text-base`}
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
