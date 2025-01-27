import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_URL;
const actionUrl = `${BASE_URL}/action`;

export async function saveRecipe({ id, token }) {
  try {
    const result = await axios.post(
      `${actionUrl}/save`,
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
      status: error.response?.status,
    };
  }
}

export async function likeRecipe({ id, token }) {
  try {
    const result = await axios.post(
      `${actionUrl}/like`,
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
      status: error.response?.status,
    };
  }
}
