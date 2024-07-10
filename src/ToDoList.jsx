import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import AddTaskDialog from './AddTaskDialog';
import TaskLists from './TaskLists';
import { useSnackbar } from 'notistack';

const ToDoList = () => {

    const intialListLocalStorage = JSON.parse(localStorage.getItem('myList'));
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState(intialListLocalStorage || []);
    const [editedTask, setEditedTask] = useState(null);

    const handleDialogClickOpen = (task) => {
        setEditedTask(task);
        setOpen(true);
    };

    const handleDialogClose = () => {
        setEditedTask(null);
        setOpen(false);
    };


    const saveTask = (updatedTask) => {
        if (updatedTask.id) {
            const updatedTasks = tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            );
            setTasks(updatedTasks);
        }
        else {
            // Add new task
            updatedTask.id = uuidv4();
            updatedTask.isChecked = false;
            setTasks([...tasks, updatedTask]);
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        handleSnackbarClick('delete');
    }

    const handleCheckTask = (index) => {
        const updatedTasks = [...tasks];
        const isCheckedBefore = updatedTasks[index].isChecked
        updatedTasks[index] = {
            ...updatedTasks[index],
            isChecked: isCheckedBefore ? false : true,
        };
        setTasks(updatedTasks);
    }

    const handleSnackbarClick = (action) => {
        if (action === 'add') {
            enqueueSnackbar('Task added successfully!', { variant: 'success' });
        }
        else if (action === 'delete') {
            enqueueSnackbar('Task deleted!', { variant: 'error' });
        }
    };

    useEffect(() => {
        localStorage.setItem('myList', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const dataFromStorage = localStorage.getItem('myList');
        if (dataFromStorage !== null) {
            setTasks(JSON.parse(dataFromStorage));
        }
    }, []);

    return (
        <div>

            <Typography variant='h2' className='title'>To Do List</Typography>

            <button className='add-button' onClick={handleDialogClickOpen}>Add new task</button>

            <AddTaskDialog
                open={open}
                handleClose={handleDialogClose}
                onSave={saveTask}
                editedTask={editedTask}
                handleSnackbarClick={handleSnackbarClick}
            />

            <div><br></br></div>

            <TaskLists
                tasks={tasks}
                deleteTask={deleteTask}
                handleDialogClickOpen={handleDialogClickOpen}
                handleCheckTask={handleCheckTask}
            />

        </div>
    )
}

export default ToDoList