import Head from "next/head";
import Container from "../../components/base/Container";
import { getActionRecipe, getRecipe } from "../../services/recipes";
import Navbar from "../../components/module/Navbar";
import Footer from "../../components/module/Footer";
import Button from "../../components/base/Button";
import { formatDistance } from "../../utils/date";
import { BiBookmark, BiLike } from "react-icons/bi";
import { useRouter } from "next/router";
import { parseCookies } from "../../utils/cookies";
import Input from "../../components/base/Input";
import { useDispatch } from "react-redux";
import { likeAction, saveAction } from "../../store/actions/recipeActions";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { req } = context;
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token || null;
  try {
    let isSaved = false;
    let isLiked = false;

    const resultRecipe = await getRecipe({ slug: id });

    if (!resultRecipe?.data) {
      return {
        props: {
          token: null,
          recipe: {},
          isSaved: false,
          isLiked: false,
          error: "Not found",
        },
      };
    }

    if (token) {
      const recipeId = resultRecipe?.data?.id;
      const resultAction = await getActionRecipe({ token, recipeId });

      isSaved = resultAction?.data?.is_saved ?? false;
      isLiked = resultAction?.data?.is_liked ?? false;
    }

    return {
      props: {
        token: token,
        recipe: resultRecipe.data,
        isSaved,
        isLiked,
      },
    };
  } catch (error) {
    console.error("Error fetching recipe:", error);

    return {
      props: {
        token: null,
        recipe: {},
        isSaved: false,
        isLiked: false,
        error: "Failed to fetch recipe",
      },
    };
  }
}

const RecipePage = ({ recipe, token, isSaved, isLiked }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const [alert, setAlert] = useState({
  //   status: `idle`,
  //   message: ``,
  // });
  // const [alertKey, setAlertKey] = useState(0);

  const handleSave = async (id) => {
    if (!token) {
      router.push(`/login`);
      return;
    }

    dispatch(saveAction(id, token, router));
  };

  const handleLike = async (id) => {
    if (!token) {
      router.push(`/login`);
      return;
    }

    dispatch(likeAction(id, token, router));
  };

  return (
    <Container>
      <Head>
        <title>Mama Recipe</title>
      </Head>

      <Navbar className={`absolute top-0`} />

      <Container className={`pt-48 pb-24 min-h-screen`}>
        <div className="px-10 md:px-[135px] xl:px-[310px]">
          <div className="pt-12 pb-12 sm:pb-20 flex flex-col justify-between items-center">
            <h1 className="font-medium text-5xl sm:text-7xl text-center text-recipe-blue">
              {recipe?.title || `Unknown`}
            </h1>
            <div className="my-10 w-full 2xl:w-3/4  flex justify-between font-normal text-lg sm:text-2xl text-recipe-dark">
              <h2>Made by {recipe?.author?.fullname || `unknown`}</h2>
              <h2 className="text-right">
                {formatDistance(recipe?.created_at)}
              </h2>
            </div>
            <div className="rounded-[15px] w-full h-auto lg:h-[650px] 2xl:w-3/4 mx-auto bg-recipe-gray relative overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={
                  recipe?.image && recipe.image.startsWith("https://")
                    ? recipe.image
                    : `/assets/icons/Default_Recipe_Image.png`
                }
                alt={recipe?.title || `Unknown`}
              />
              <div className="absolute right-0 lg:right-10 bottom-0 lg:bottom-10 m-2 sm:m-5 lg:m-0 flex justify-end gap-1 sm:gap-2">
                <Button
                  onClick={() => handleSave(recipe?.id)}
                  className={`${
                    isSaved
                      ? `bg-recipe-yellow-normal hover:bg-recipe-yellow-dark`
                      : `bg-white border hover:bg-recipe-yellow-normal`
                  } border-recipe-yellow-normal ${
                    isSaved
                      ? `text-white`
                      : `text-recipe-yellow-normal hover:text-white`
                  } w-10 h-10 sm:w-14 sm:h-14`}
                >
                  <BiBookmark className="mx-auto text-3xl sm:text-4xl" />
                </Button>
                <Button
                  onClick={() => handleLike(recipe?.id)}
                  className={`${
                    isLiked
                      ? `bg-recipe-yellow-normal hover:bg-recipe-yellow-dark`
                      : `bg-white border hover:bg-recipe-yellow-normal`
                  } border-recipe-yellow-normal ${
                    isLiked
                      ? `text-white`
                      : `text-recipe-yellow-normal hover:text-white`
                  } w-10 h-10 sm:w-14 sm:h-14`}
                >
                  <BiLike className="mx-auto text-3xl sm:text-4xl" />
                </Button>
              </div>
            </div>
          </div>

          <Ingredients description={recipe?.description} />

          <VideoSteps data={recipe?.videos} />

          <div className="flex flex-col justify-between items-center gap-12 mx-auto">
            <Input type="textarea" placeholder="Comment :" />
            <Button
              className={`rounded-[15px] w-full md:w-2/3 lg:w-1/3 py-5 bg-recipe-yellow-normal hover:bg-recipe-yellow-dark text-white font-medium text-base`}
            >
              Send
            </Button>

            <Comments data={recipe?.comments} />
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
      <h2 className="font-normal text-3xl sm:text-5xl text-recipe-dark">
        Ingredients
      </h2>
      <p className="py-8 font-light text-2xl sm:text-4xl sm:leading-[46px] whitespace-pre-line">
        {description}
      </p>
    </div>
  );
};

const VideoSteps = ({ data }) => {
  const router = useRouter();
  if (data?.length != 0) {
    return (
      <div className="w-full py-6">
        <h2 className="font-normal text-5xl text-recipe-dark">Video Step</h2>
        {data?.map((video) => {
          return (
            <div
              key={video.id}
              className="w-full my-8 flex flex-col justify-between gap-8"
            >
              <Button
                onClick={() => router.push(video?.url)}
                className={`w-1/3 py-5 bg-recipe-yellow-normal hover:bg-recipe-yellow-dark text-white font-medium text-base`}
              >
                <img
                  className="mx-auto"
                  src="/assets/icons/play.png"
                  alt="play"
                />
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
};

const Comments = ({ data }) => {
  if (data?.length != 0) {
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
