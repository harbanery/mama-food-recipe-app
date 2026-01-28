import axios from "axios";
import { BASE_URL } from "../utils/constants";

const userUrl = `${BASE_URL}/account`;

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
    return {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status || 500,
    };
  }
}
