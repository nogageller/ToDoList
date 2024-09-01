import axios from '../api/axios';


export const getTasks = async () => {
    try {
        const response = await axios.get('/tasks');
        console.log('Fetched tasks:', response.data); // Log the data to inspect
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const createTask = async (task) => {
    try {
        const response = await axios.post('/tasks', task);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export const updateTask = async ({ id, updatedTask } ) => {
    try {
        const response = await axios.put(`/tasks/${id}`, updatedTask);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    if (!id) {
        console.log('There is no id');
        throw new Error('ID is required to delete a task');
    }
    try {
        await axios.delete(`/tasks/${id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};
