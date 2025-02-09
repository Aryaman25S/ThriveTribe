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

const getFormattedDate = (date = new Date()) => {
    return date.toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"});
};


export const fetchTaskList = async (userName: string) => {
    try {
        const response = await api.get(`/tasks/${userName}`);
        return response.data.map(d => {
            return {
                title: d.title,
                completed: d.status == "completed",
                dateCompleted: getFormattedDate(new Date(d.created_at))
            };
        });
    } catch (error) {
        console.error("Error fetching task list:", error);
        return [];
    }
};


export default api;