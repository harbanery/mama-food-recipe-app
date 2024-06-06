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
import * as yup from "yup";
import { uploadImage } from "../../../services/assets";
import Input from "../../../components/base/Input";

export async function getServerSideProps(context) {
  const { id } = context.params;
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
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    image: yup.string().required("Image is required"),
  });
  const [alert, setAlert] = useState({
    status: `idle`,
    message: ``,
  });
  const [alertKey, setAlertKey] = useState(0);
  const [errors, setErrors] = useState({});
  const [updatedRecipe, setUpdatedRecipe] = useState({
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    image: recipe.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    setUpdatedRecipe({
      ...updatedRecipe,
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

    try {
      const { url } = await uploadImage({ file });

      console.log(url);
      setUpdatedRecipe({
        ...updatedRecipe,
        image: url,
      });

      setErrors({
        ...errors,
        image: "",
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
    if (!token) {
      router.push(`/login`);
      return;
    }

    try {
      await schema.validate(updatedRecipe, { abortEarly: false });

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
    } catch (err) {
      if (err.inner) {
        const validateErrors = err.inner.reduce((acc, curr) => {
          return { ...acc, [curr.path]: curr.message };
        }, {});
        setErrors(validateErrors);
        setAlert({
          status: "failed",
          message: `Recipe should not empty`,
        });
        setAlertKey((prevKey) => prevKey + 1);
      }
    }

    // try {
    //   const { message } = await updateRecipe({
    //     data: updatedRecipe,
    //     token: token,
    //   });

    //   setAlert({
    //     status: "success",
    //     message: message,
    //   });

    //   router.push(`/profile`);
    // } catch (error) {
    //   setAlert({
    //     status: "failed",
    //     message: error.message,
    //   });
    //   setAlertKey((prevKey) => prevKey + 1);
    // }
  };

  return (
    <Container>
      <Head>
        <title>Update Recipe - Mama Recipe</title>
      </Head>

      <Alert status={alert.status} message={alert.message} count={alertKey} />

      <Navbar className={`absolute top-0`} />

      <Container className={`pt-48 pb-24 min-h-screen`}>
        <div className="px-10 md:px-[135px] xl:px-[310px]">
          <div className="flex flex-col justify-between items-center gap-12 mx-auto">
            <label
              htmlFor="file-upload"
              className={`inline-block relative cursor-pointer w-full ${
                updatedRecipe.image ? `h-auto` : `h-72 min-[520px]:h-96`
              } ${
                errors.image
                  ? `bg-red-200 border-4 border-red-400`
                  : `bg-recipe-ice`
              } rounded-[15px] outline-none font-normal text-lg md:text-2xl text-recipe-corral`}
            >
              {!updatedRecipe.image ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                  <BiImage className="text-4xl md:text-6xl" />
                  <span>{`Add Photo`}</span>
                  <span>{`PNG, JPG, or JPEG`}</span>
                  <span>{`Size Maximum 800x600`}</span>
                </div>
              ) : (
                <div className="w-full h-full rounded-[15px] overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={
                      updatedRecipe.image &&
                      updatedRecipe.image.startsWith("https://")
                        ? updatedRecipe.image
                        : `/assets/icons/Default_Recipe_Image.png`
                    }
                    alt={updatedRecipe.title}
                  />
                </div>
              )}
            </label>
            <Input id="file-upload" type="file" onChange={handleFileChange} />

            <Input
              type="text"
              name="title"
              value={updatedRecipe.title}
              error={errors.title}
              onChange={handleChange}
              placeholder="Title"
            />

            <Input
              type="textarea"
              name="description"
              value={updatedRecipe.description}
              error={errors.description}
              onChange={handleChange}
              placeholder="Ingredients"
            />

            <Button
              onClick={handleSubmit}
              className={`rounded-[15px] w-full md:w-2/3 lg:w-2/5 xl:w-1/3 py-5 bg-recipe-yellow-normal hover:bg-recipe-yellow-dark text-white font-medium text-base`}
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
