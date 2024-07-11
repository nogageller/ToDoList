import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import TaskDialog from './TaskDialog';
import TaskLists from './TaskLists';
import { useSnackbar } from 'notistack';

const ToDoList = () => {

    const intialListLocalStorage = JSON.parse(localStorage.getItem('myList'));
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState(intialListLocalStorage || []);

    const handleDialogClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleSnackbarClick = (action) => {
        if (action === 'add') {
            enqueueSnackbar('Task added successfully!', { variant: 'success' });
        }
        else if (action === 'delete') {
            enqueueSnackbar('Task deleted!', { variant: 'success' });
        }
        else if (action === 'save') {
            enqueueSnackbar('Task saved successfully!', { variant: 'success' });
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

            {
                open &&
                <TaskDialog
                    open={open}
                    handleClose={handleDialogClose}
                    handleSnackbarClick={handleSnackbarClick}
                    setTasks={setTasks}
                    tasks={tasks}
                />
            }

            <div><br></br></div>

            <TaskLists
                tasks={tasks}
                handleDialogClickOpen={handleDialogClickOpen}
                setTasks={setTasks}
                handleSnackbarClick={handleSnackbarClick}
            />

        </div>
    )
}

export default ToDoList