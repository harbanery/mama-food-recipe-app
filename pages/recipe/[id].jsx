import Head from "next/head";
import Container from "../../components/base/Container";
import { getRecipeById } from "../../services/recipes";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import Button from "../../components/base/Button";
import { formatDistance } from "../../utils/date";
import { BiBookmark, BiLike } from "react-icons/bi";

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const result = await getRecipeById({ id });

    if (!result || !result.data) {
      return {
        props: {
          error: "Not found",
        },
      };
    }

    return {
      props: {
        recipe: result.data,
      },
    };
  } catch (error) {
    console.error("Error fetching recipe:", error);

    return {
      props: {
        error: "Failed to fetch recipe",
      },
    };
  }
}

const RecipePage = ({ recipe }) => {
  // dummy data
  const data = {
    id: `1`,
    title: `Healthy Bone Broth Ramen (Quick & Easy)`,
    image: `/assets/Rectangle 313.png`,
    description: `- 2 eggs \n- 2 tbsp mayonnaise \n- 3 slices bread \n- a little butter \n- ⅓ carton of cress \n- 2-3 slices of tomato or a lettuce leaf and a slice of ham or cheese \n- crisps , to serve`,
    videos: [],
    comments: [],
  };
  // ------------

  return (
    <Container>
      <Head>
        <title>Mama Recipe</title>
      </Head>

      <Navbar className={`absolute top-0`} />

      <Container className={`pt-48 pb-24 min-h-screen`}>
        <div className="px-[310px]">
          <div className="pt-12 pb-20 flex flex-col justify-between items-center">
            <h1 className="font-medium text-7xl text-center text-recipe-blue">
              {recipe?.title || data.title}
            </h1>
            <div className="my-10 w-full 2xl:w-3/4  flex justify-between font-normal text-2xl text-recipe-dark">
              <h2>Made by {recipe?.author.name || `unknown`}</h2>
              <h2 className="text-right">
                {formatDistance(recipe?.created_at)}
              </h2>
            </div>
            <div className="rounded-[15px] w-full h-[650px] 2xl:w-3/4 mx-auto bg-recipe-gray relative overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={
                  recipe.image && recipe.image.startsWith("https://")
                    ? recipe.image
                    : `/assets/icons/Default_Recipe_Image.png`
                }
                alt={recipe?.title || data.title}
              />
              <div className="absolute right-10 bottom-10 flex justify-end gap-2">
                <Button
                  className={`bg-white border hover:bg-recipe-yellow-normal border-recipe-yellow-normal text-recipe-yellow-normal hover:text-white w-14 h-14`}
                >
                  <BiBookmark className="mx-auto text-4xl" />
                </Button>
                <Button
                  className={`bg-white border hover:bg-recipe-yellow-normal border-recipe-yellow-normal text-recipe-yellow-normal hover:text-white w-14 h-14`}
                >
                  <BiLike className="mx-auto text-4xl" />
                </Button>
              </div>
            </div>
          </div>

          <Ingredients description={recipe.description || data.title} />

          <VideoSteps data={data.videos} />

          <div className="flex flex-col justify-between items-center gap-12 mx-auto">
            <textarea
              className="p-10 w-full h-80 bg-recipe-ice rounded-[15px] outline-none placeholder:font-normal placeholder:text-2xl placeholder:text-recipe-corral"
              name=""
              id=""
              placeholder="Comment:"
            ></textarea>
            <Button
              className={`rounded-[15px] w-1/3 py-5 bg-recipe-yellow-normal hover:bg-recipe-yellow-dark text-white font-medium text-base`}
            >
              Send
            </Button>

            <Comments data={data.comments} />
          </div>
        </div>
      </Container>

      <Footer />
    </Container>
  );
};

const Ingredients = ({ description }) => {
  return (
    <div className="w-full py-6">
      <h2 className="font-normal text-5xl text-recipe-dark">Ingredients</h2>
      <p className="py-8 font-light text-4xl leading-[46px] whitespace-pre-line">
        {description}
      </p>
    </div>
  );
};

const VideoSteps = ({ data }) => {
  if (data.length != 0) {
    return (
      <div className="w-full py-6">
        <h2 className="font-normal text-5xl text-recipe-dark">Video Step</h2>
        <div className="w-full my-8 flex flex-col justify-between gap-8">
          <Button
            className={`w-1/3 py-5 bg-recipe-yellow-normal hover:bg-recipe-yellow-dark text-white font-medium text-base`}
          >
            <img className="mx-auto" src="/assets/icons/play.png" alt="play" />
          </Button>
        </div>
      </div>
    );
  }
};

const Comments = ({ data }) => {
  if (data.length != 0) {
    return (
      <div className="w-full py-6">
        <h2 className="pb-4 font-normal text-5xl text-recipe-dark">Comment</h2>
        <div className="py-4 flex gap-8">
          <div className="rounded-[100%] w-16 h-16 overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src="/assets/Rectangle 313.png"
              alt="Ayudia"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-normal text-2xl">Ayudia</h1>
            <p className="font-light text-2xl">
              Nice recipe. simple and delicious, thankyou
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default RecipePage;
