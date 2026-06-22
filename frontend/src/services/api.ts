import axios from "axios";
import type {User} from "../data/user";


const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (formData: Omit<User, "id">) => {
    const response = await api.post("/auth/signup", formData);
    return response.data; // Return the response data to the caller

}

export default api;

