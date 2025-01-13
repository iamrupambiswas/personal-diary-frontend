import axiosInstance from "./axios";

export const getEntries = async () => {
    try {
        const response = await axiosInstance.get('/entries');
        return response.data;
    } catch (error) {
        console.error('Error fetching entries: ', error);
        throw error;
    }
};

export const getEntryById = async (id) => {
    try {
        const response = await axiosInstance.get(`/entry/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting entry: ', error);
        throw error;
    } 
}

export const addEntry = async (entry) => {
    try {
        const response = await axiosInstance.post('/entries', entry);
        return response.data;
    } catch (error) {
        console.error('Error adding entry:', error);
        throw error;
    }
};

// Edit a diary entry
export const updateEntry = async (id, updatedEntry) => {
    try {
        const response = await axiosInstance.put(`/entries/${id}`, updatedEntry);
        return response.data;
    } catch (error) {
        console.error('Error updating entry:', error);
        throw error;
    }
};

// Delete a diary entry
export const deleteEntry = async (id) => {
    try {
        await axiosInstance.delete(`/entries/${id}`);
    } catch (error) {
        console.error('Error deleting entry:', error);
        throw error;
    }
};