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
        console.log(response.data);
    return response.data; // Return the response data to the caller

}

export default api;

//one thing i encountered was when we send the message with status code 400, the error is catch by catch block and the message is not shown to the user. To fix this, we can check the error response in the catch block and show the message accordingly.