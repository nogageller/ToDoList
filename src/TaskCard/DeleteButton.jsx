import React from 'react'
import { useAtom } from 'jotai';
import { tasksAtom } from '../ToDoList';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';

const DeleteButton = ({taskId}) => {
    const [tasks, setTasks] = useAtom(tasksAtom);
    const { enqueueSnackbar } = useSnackbar();

    const deleteTask = () => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        enqueueSnackbar('Task deleted!', { variant: 'success' });
    }


    return (
        <div>
            <IconButton
                className='delete-button'
                aria-label="delete"
                onClick={() => deleteTask()}
                sx={{ color: 'white' }}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    )
}

export default DeleteButton