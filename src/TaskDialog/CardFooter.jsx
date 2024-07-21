import React from 'react'
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import useTodos from '../hooks/useTodos';
import useFilterTodos from '../hooks/useFilterTodos';

const CardFooter = ({ editedTask, handleClose, handleSubmit }) => {

    const { tasks, setTasks } = useTodos();
    const { enqueueSnackbar } = useSnackbar();
    const { filterTasks, setFilterTasks } = useFilterTodos();

    const handleSave = (data) => {
        saveTask(data);
        handleClose();
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
        enqueueSnackbar('Task saved successfully!', { variant: 'success' });
    };

    return (
        <div>
            <button className='dialog-buttons' type='submit' onClick={handleSubmit(handleSave)}>{editedTask ? 'Save' : 'Add'}</button>
            <button className='dialog-buttons' type='button' onClick={handleClose}>Cancel</button>
        </div>
    )
}

export default CardFooter