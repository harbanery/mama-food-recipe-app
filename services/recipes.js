import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_URL;
const recipeUrl = `${BASE_URL}/recipe`;

export async function getAllRecipes({
  keyword,
  limit = 6,
  page = 1,
  sorting = `created_at`,
  orderBy = `desc`,
}) {
  try {
    const result = await axios.get(`${recipeUrl}/list`, {
      params: {
        ...(keyword ? { keywords: keyword } : {}),
        limit,
        page,
        sort: sorting,
        order_by: orderBy,
      },
    });

    return {
      data: result.data?.data || {},
      message: result.data?.message || "Success",
      status: result.data?.code,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
      status: result.data?.code,
    };
  }
}

export async function getRecipe({ slug }) {
  try {
    const result = await axios.get(`${recipeUrl}/detail`, { params: { slug } });

    return {
      data: result.data?.data,
      message: result.data?.message || "Success",
      status: result.data?.code || 200,
    };
  } catch (error) {
    throw {
      message: error.response?.data?.message || "An error occurred",
      status: result.data?.code,
    };
  }
}

export async function getActionRecipe({ token, recipeId }) {
  try {
    const result = await axios.get(`${recipeUrl}/action`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { id: recipeId },
    });

    return {
      data: result.data.data,
      message: result.data?.message || "Success",
      status: result.data?.code || 200,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
      status: result.data?.code,
    };
  }
}

export async function addRecipe({ data, token }) {
  try {
    const result = await axios.post(
      `${recipeUrl}/add`,
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
      message: result.data?.message || "Success",
      status: result.code,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.code,
    };
  }
}

export async function updateRecipe({ data, token }) {
  try {
    const result = await axios.put(
      `${recipeUrl}/update`,
      {
        id: data.id,
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
      message: result.data?.message || "Success",
      status: result.code,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.code,
    };
  }
}

export async function deleteRecipe({ id, token }) {
  try {
    const result = await axios.delete(`${recipeUrl}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    });

    return {
      message: result.data?.message || "Success",
      status: result.code,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.code,
    };
  }
}
