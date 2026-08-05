import axios from "axios";
import type {User} from "../data/user";
import type {UpdateProfilePayload} from "../data/updateprofilepayload";
import type { User as AuthUser } from "../store/authStore";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This allows the browser to send cookies along with requests to the backend, which is necessary for session management and authentication.
});

export const registerUser = async (formData: Omit<User, "id">) => {
    const response = await api.post("/auth/signup", formData);
    return response.data; 
}

export const loginUser=async(formData:Omit<User,"id"|"fullName">)=>{
    const response=await api.post("/auth/login",formData);
    return response.data;
}

export const logout=async()=>{
    const response=await api.post("/auth/logout");
    return response.data;
}

// Convert the backend's snake_case user row into the camelCase shape used across the app.
const mapUser = (u: any): AuthUser => ({
    fullName: u.fullName ?? "",
    email: u.email ?? "",
    currentPosition: u.current_position ?? "",
    targetPosition: u.target_position ?? "",
    linkedin: u.linkedin ?? "",
});

export const fetchCurrentUser=async()=>{
    const response=await api.get("/auth/me");
    return { ...response.data, user: mapUser(response.data.user) };
}

export const signInWithGoogle = () => {
    window.location.href = `${api.defaults.baseURL}/auth/google`;
}

// Exchange the token issued by the Google OAuth callback for an auth cookie set in this
// (frontend) origin's partition. See POST /auth/session on the backend for why this is needed.
export const establishSession = async (token: string) => {
    const response = await api.post("/auth/session", { token });
    return response.data;
}


export const updateUserProfile = async (payload: UpdateProfilePayload) => {
    try {
        const response = await api.put("/auth/me", payload);
        return { ...response.data, user: mapUser(response.data.user) };
    }
    catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
}
export default api;

