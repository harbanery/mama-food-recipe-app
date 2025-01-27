import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_URL;
const uploadUrl = `${BASE_URL}/upload`;

export async function uploadImage({ file }) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const result = await axios.post(uploadUrl, formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    return {
      url: result.data?.data?.[0]?.file_url,
      message: result.data?.message || "Success",
      status: result.data?.code || 200,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.data?.code,
    };
  }
}

export async function uploadVideo({ file }) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const result = await axios.post(uploadUrl, formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    return {
      data: result.data?.data || [],
      message: result.data?.message || "Success",
      status: result.data?.code || 200,
    };
  } catch (error) {
    return {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.data?.code,
    };
  }
}
