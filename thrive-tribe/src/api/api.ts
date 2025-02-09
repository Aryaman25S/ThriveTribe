import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Use correct backend URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchGroupDetails = async () => {
  try {
    const response = await api.get("/groups"); // Adjust endpoint if needed
    return response.data;
  } catch (error) {
    console.error("Error fetching group details:", error);
    return null;
  }
};

export default api;
