import axiosInstance from "./axios";

const token = localStorage.getItem('authToken');
console.log(token); // Check if the token is retrieved correctly

export const getEntries = async () => {
    try {
        // Make the GET request using axios
        const response = await axiosInstance.get('/entries', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Correct the token format
            },
        });

        // Axios automatically parses the response as JSON
        return response.data; // Access data from the response
    } catch (error) {
        console.error('Error fetching entries: ', error);
        throw error; // Rethrow the error to handle it at the call site
    }
};


export const getEntryById = async (entryId) => {
    try {
        // Make the GET request using axios
        const response = await axiosInstance.get(`/entry/${entryId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Correct the token format
            },
        });

        // Return the entry data
        return response.data;
    } catch (error) {
        console.error('Error fetching entry by ID: ', error);
        throw error; // Rethrow the error to handle it at the call site
    }
};

export const addEntry = async (entryData) => {
    try {
        // Make the POST request using axios
        const response = await axiosInstance.post('/entries', entryData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Correct the token format
            },
        });

        // Return the data (which may include the created entry)
        return response.data;
    } catch (error) {
        console.error('Error adding entry: ', error);
        throw error; // Rethrow the error to handle it at the call site
    }
};

// Edit a diary entry
export const updateEntry = async (entryId, updatedData) => {
    try {
        // Make the PUT request using axios
        const response = await axiosInstance.put(`/entries/${entryId}`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Correct the token format
            },
        });

        // Return the updated entry data
        return response.data;
    } catch (error) {
        console.error('Error updating entry: ', error);
        throw error; // Rethrow the error to handle it at the call site
    }
};


export const deleteEntry = async (entryId) => {
    try {
        // Make the DELETE request using axios
        const response = await axiosInstance.delete(`/entries/${entryId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Correct the token format
            },
        });

        // Return the success message or the response data
        return response.data;
    } catch (error) {
        console.error('Error deleting entry: ', error);
        throw error; // Rethrow the error to handle it at the call site
    }
};