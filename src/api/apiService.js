import axios from '../api/axios';

export const getTasks = async (filter = '') => {
    const response = await axios.get('/tasks', {
        params: { filter }
    });
    console.log('Fetched tasks:', response.data);
    return response.data;
};

export const getSubjects = async () => {
    const response = await axios.get('/subjects');
    console.log('Fetched subjects:', response.data);
    return response.data;
};

export const createTask = async (task) => {
    const response = await axios.post('/tasks', task);
    return response.data;
};

export const updateTask = async ({ id, updatedTask }) => {
    const response = await axios.put(`/tasks/${id}`, updatedTask);
    return response.data;
};

export const updateTaskCompletion = async (task) => {
    const response = await axios.patch(`/tasks/${task._id}`, { isChecked: !task.isChecked });
    return response.data;
};

export const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`);
};

export const deleteDoneTasks = async () => {
    await axios.delete(`/tasks/deleteDone`);
};
