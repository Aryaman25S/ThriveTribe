import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Adjust for mobile

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch Group Details by Name
export const fetchGroupDetails = async (groupName: string) => {
  try {
    const response = await api.get(`/groups/detail/${groupName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching group details:", error);
    return null;
  }
};

export default api;