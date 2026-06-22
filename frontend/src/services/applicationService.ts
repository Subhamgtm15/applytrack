import type { Application } from "../data/applications";
import api from "./api";

export const sendApplication = async (formData: Omit<Application, "id">) => {
  try {
    const response = await api.post("/applications", formData);
    return response.data; // Return the response data to the caller
  } catch (error) {
    console.error("Error sending application:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
 
export const updateApplication = async (id: number, formData: Omit<Application, "id">) => {
  try {
    const response = await api.put(`/applications/${id}`, formData);
    return response.data; // Return the response data to the caller
  } catch (error) {
    console.error("Error updating application:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const getSpecificApplication = async (id: number) => {
  try {
    const response = await api.get(`/applications/${id}`);
    return response.data; // Return the response data to the caller
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export const deleteOneApplication = async (id: number) => {
  try {
    const response = await api.delete(`/applications/${id}`);
    return response.data; // Return the response data to the caller
  }
  catch (error) {
    console.error("Error deleting application:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const getAllApplications = async () => {
  try {
    const response = await api.get("/applications");
    return response.data.applications.map((app: any) => {
      return {
        ...app,
        dateApplied: app.date_applied,
        followUpDate: app.follow_up_date
      }
    })
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};