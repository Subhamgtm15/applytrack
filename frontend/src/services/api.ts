import axios from "axios";
import type {User} from "../data/user";


const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (formData: Omit<User, "id">) => {
  try {
    const response = await api.post("/auth/signup", formData);
    console.log(response.data);
    return response.data; // Return the response data to the caller
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export default api;
