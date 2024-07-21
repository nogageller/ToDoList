import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import useTodos from '../hooks/useTodos';
import useFilterTodos from '../hooks/useFilterTodos';

const DeleteButton = ({ taskId }) => {
    const { tasks, setTasks } = useTodos();
    const { enqueueSnackbar } = useSnackbar();
    const { setFilterTasks } = useFilterTodos();

    const deleteTask = () => {
        // think about way to to this on O(1)
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        setFilterTasks(updatedTasks);
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