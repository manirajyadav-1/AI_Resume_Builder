import axios from "axios";


export const baseURLL = import.meta.env.VITE_REACT_APP_API_URL;

console.log(baseURLL);

export const axiosInstance = axios.create({
  baseURL: baseURLL,
});

export const generateResume = async (description) => {
  const response = await axiosInstance.post("/resume/generate", {
    userDescription: description,
  });

  return response.data;
};