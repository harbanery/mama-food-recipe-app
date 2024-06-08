import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_URL;
const uploadUrl = `${BASE_URL}/v1/upload`;

export async function uploadImage({ file }) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const result = await axios.post(uploadUrl, formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    // console.error("Result:", result);
    return {
      url: result.data.data.file_url,
      message: result.data?.message || "Success",
      status: result.data?.status || 200,
    };
  } catch (error) {
    // console.error("API Error:", error);
    return {
      message: error.response?.data?.message || "An error occurred",
    };
  }
}
