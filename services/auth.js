import axios from "axios";
import { BASE_URL } from "../utils/constants";

const authUrl = `${BASE_URL}`;

export async function register({ form }) {
  try {
    const result = await axios.post(`${authUrl}/signup`, {
      fullname: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
    });

    return {
      message: result.data?.message || "Success",
      status: result.data?.code,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.data?.code,
    };
  }
}

export async function login({ form }) {
  try {
    const result = await axios.post(`${authUrl}/signin`, {
      email: form.email,
      password: form.password,
    });

    return {
      token: result.data?.data?.access_token,
      refreshToken: result.data?.data?.refresh_token,
      message: result.data?.message || "Success",
      status: result.data?.code,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.data?.code,
    };
  }
}

export async function logout() {
  try {
    const result = await axios.get(`${authUrl}/signout`);

    return {
      message: result.data?.message || "Success",
      status: result.data?.code,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.data?.code,
    };
  }
}
