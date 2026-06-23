import axios from "axios";
import type {User} from "../data/user";


const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This allows the browser to send cookies along with requests to the backend, which is necessary for session management and authentication.
});

export const registerUser = async (formData: Omit<User, "id">) => {
    const response = await api.post("/auth/signup", formData);
    return response.data; // Return the response data to the caller

}

export const loginUser=async(formData:Omit<User,"id"|"fullName">)=>{
    const response=await api.post("/auth/login",formData);
    return response.data;
}

export default api;

