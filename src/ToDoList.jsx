import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import TaskDialog from './TaskDialog';
import TaskLists from './TaskLists';
import { useSnackbar } from 'notistack';
import { atom, useAtom } from 'jotai';

const initialListLocalStorage = JSON.parse(localStorage.getItem('myList')) || [];

export const tasksAtom = atom(initialListLocalStorage);


const ToDoList = () => {

    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);
    
    const [tasks, setTasks] = useAtom(tasksAtom);

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
                />
            }

            <div><br></br></div>

            <TaskLists
                handleSnackbarClick={handleSnackbarClick}
            />

        </div>
    )
}

export default ToDoList