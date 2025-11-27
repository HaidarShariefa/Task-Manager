import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

async function uploadImage(imageFile) {
  const formData = new FormData();

  //append image file to formdata
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", //set header for file upload
        },
      }
    );
    return response.data; // Return response data
  } catch (err) {
    console.error("Error uploading the image:", err);
    throw err; // Rethrow the error for handling
  }
}

export default uploadImage;
