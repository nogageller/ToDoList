import React from 'react'
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import UseTodos from '../hooks/useTodos';
import UseFilterTodos from '../hooks/useFilterTodos';

const CardFooter = ({ editedTask, formData, setFormData, handleClose, defualtTask }) => {

    const { tasks, setTasks } = UseTodos();
    const { enqueueSnackbar } = useSnackbar();
    const { filterTasks, setFilterTasks } = UseFilterTodos();

    const handleSave = () => {
        saveTask(formData);
        handleClose();
        enqueueSnackbar(editedTask ? 'Task saved successfully!' : 'Task added successfully!', { variant: 'success' });
    };

    const saveTask = (updatedTask) => {
        if (updatedTask.id) {
            const updatedTasks = tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            );
            setTasks(updatedTasks);
            setFilterTasks(updatedTasks);
        }
        else {
            // Add new task
            updatedTask.id = uuidv4();
            updatedTask.isChecked = false;
            setTasks([...tasks, updatedTask]);
            setFilterTasks([...filterTasks, updatedTask]);
        }
        setFormData(defualtTask);
    };

    return (
        <div>
            <button className='dialog-buttons' onClick={handleSave}>{editedTask ? 'Save' : 'Add'}</button>
            <button className='dialog-buttons' onClick={handleClose}>Cancel</button>
        </div>
    )
}

export default CardFooter