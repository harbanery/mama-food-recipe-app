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
    throw {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function getTotalRecipesCount({ keyword, limit }) {
  try {
    const result = await axios.get(recipeUrl, {
      params: {
        ...(keyword ? { search: keyword } : {}),
        limit: 9999,
      },
    });

    return {
      total: Math.ceil(result.data.data.length / limit),
      message: result.data?.message || "Success",
      status: result.data?.status || 200,
    };
  } catch (error) {
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
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function saveRecipe({ id, token }) {
  try {
    const result = await axios.post(
      `${recipeUrl}/save`,
      {
        recipe_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      message: result.data?.message || "Success",
      status: result.status,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function deleteSaveRecipe({ id, token }) {
  try {
    const result = await axios.delete(`${recipeUrl}/save/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      message: result.data?.message || "Success",
      status: result.status,
    };
  } catch (error) {
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
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function likeRecipe({ id, token }) {
  try {
    const result = await axios.post(
      `${recipeUrl}/like`,
      {
        recipe_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      message: result.data?.message || "Success",
      status: result.status,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function deleteLikeRecipe({ id, token }) {
  try {
    const result = await axios.delete(`${recipeUrl}/like/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      message: result.data?.message || "Success",
      status: result.status,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function addRecipe({ data, token }) {
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

    return {
      data: result.data.data,
      message: result.data?.message || "Success",
      status: result.status,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function updateRecipe({ data, token }) {
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

    return {
      data: result.data.data,
      message: result.data?.message || "Success",
      status: result.status,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function deleteRecipe({ id, token }) {
  try {
    const result = await axios.delete(`${recipeUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      message: result.data?.message || "Success",
      status: result.status,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}
