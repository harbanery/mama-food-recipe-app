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

    return {
      token: result.data?.data?.token,
      refreshToken: result.data?.data?.refreshToken,
      message: result.data?.message || "Success",
      status: result.data?.status,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}

export async function logout() {
  try {
    const result = await axios.get(`${authUrl}/logout`);

    return {
      message: result.data?.message || "Success",
      status: result.data?.status,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}
