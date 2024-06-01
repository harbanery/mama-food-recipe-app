import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_URL;
const userUrl = `${BASE_URL}/v1/users`;

export async function getProfile({ token }) {
  try {
    const result = await axios.get(`${userUrl}/profile`, {
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
      status: error.response?.status || 500,
    };
  }
}
