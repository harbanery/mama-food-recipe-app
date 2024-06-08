import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_URL;
const authUrl = `${BASE_URL}/v1/auth`;

export async function register({ form }) {
  try {
    const result = await axios.post(`${authUrl}/register`, {
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
    });

    return {
      message: result.data?.message || "Success",
      status: result.data?.status,
    };
  } catch (error) {
    // console.error("API Error:", error);
    throw {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function login({ form }) {
  try {
    const result = await axios.post(`${authUrl}/login`, {
      email: form.email,
      password: form.password,
    });

    // console.error("Result:", result);
    return {
      token: result.data?.data?.token,
      refreshToken: result.data?.data?.refreshToken,
      message: result.data?.message || "Success",
      status: result.data?.status,
    };
  } catch (error) {
    // console.error("API Error:", error);
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function logout() {
  try {
    const result = await axios.get(`${authUrl}/logout`);

    // console.error("Result:", result);
    return {
      message: result.data?.message || "Success",
      status: result.data?.status,
    };
  } catch (error) {
    // console.error("API Error:", error);
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}
