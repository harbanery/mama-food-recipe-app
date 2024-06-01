import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_URL;
const recipeUrl = `${BASE_URL}/v1/recipes`;

export async function getAllRecipes({
  keyword,
  limit = 6,
  page = 1,
  sorting = `created_at`,
  orderBy = `desc`,
}) {
  try {
    const result = await axios.get(recipeUrl, {
      params: {
        ...(keyword ? { search: keyword } : {}),
        limit: limit,
        page: page,
        sort: sorting,
        sortBy: orderBy,
      },
    });

    return {
      data: result.data.data,
      message: result.data?.message || "Success",
      status: result.data?.status || 200,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function getRecipeById({ id }) {
  try {
    const result = await axios.get(`${recipeUrl}/${id}`);

    return {
      data: result.data.data,
      message: result.data?.message || "Success",
      status: result.data?.status || 200,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function getMyRecipes({ token }) {
  try {
    const result = await axios.get(`${recipeUrl}/self`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      data: result.data.data,
      message: result.data?.message || "Success",
      status: result.data?.status || 200,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function getSavedRecipes({ token }) {
  try {
    const result = await axios.get(`${recipeUrl}/save`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      data: result.data.data,
      message: result.data?.message || "Success",
      status: result.data?.status || 200,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function getLikedRecipes({ token }) {
  try {
    const result = await axios.get(`${recipeUrl}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      data: result.data.data,
      message: result.data?.message || "Success",
      status: result.data?.status || 200,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function addRecipe({ data, token }) {
  // console.log(data.title);
  try {
    const result = await axios.post(
      `${recipeUrl}/`,
      {
        title: data.title,
        description: data.description,
        image: data.image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.error("Result:", result);
    return {
      data: result.data.data,
      message: result.data?.message || "Success",
      status: result.status,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function updateRecipe({ data, token }) {
  // console.log(data.title);
  try {
    const result = await axios.put(
      `${recipeUrl}/${data.id}`,
      {
        title: data.title,
        description: data.description,
        image: data.image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.error("Result:", result);
    return {
      data: result.data.data,
      message: result.data?.message || "Success",
      status: result.status,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function deleteRecipe({ id, token }) {
  // console.log(id);
  // console.log(token);
  try {
    const result = await axios.delete(`${recipeUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.error("Result:", result);
    return {
      message: result.data?.message || "Success",
      status: result.status,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}
