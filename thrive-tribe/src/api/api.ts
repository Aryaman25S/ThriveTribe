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

export const fetchCurrentTask = async (userName: string) => {
    try {
        const response = await api.get(`/tasks/gettoday/${userName}`);
        return {
            id: response.data.id,
            title: response.data.title,
            completed: response.data.status == "completed",
            proof: null,
        }
    } catch (error) {
        console.error("Error fetching current task:", error);
        return [];
    }
};

export const setTaskStatusToComplete = async (username: string) => {
    try {
        await api.patch(`/tasks/complete/${username}`);
    } catch (error) {
        console.error("error setting task status to completed:", error);
        return [];
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await api.post(`/users/login`, {email, password});
        return response.status;
    } catch (error) {
        console.error("error logging in", error);
        return 500;
    }
};

export default api;