import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import useFilterTodos from '../hooks/useFilterTodos';
import _keyBy from 'lodash/keyBy';
import useTodos from '../hooks/useTodos';
import useDeleteTask from '../hooks/useDeleteTask';

const DeleteButton = ({ taskId }) => {
    const { tasks, setTasks } = useTodos({ keyBy: true });
    const { enqueueSnackbar } = useSnackbar();
    //const { setFilterTasks } = useFilterTodos();

    const { mutate: deleteTask } = useDeleteTask();


    const handleDeleteTask = async () => {
        const { [taskId]: deletedTask, ...remainingTasks } = tasks;
        const updatedTasks = Object.values(remainingTasks);

        setTasks(updatedTasks);
        //setFilterTasks(updatedTasks);
        //enqueueSnackbar('Task deleted!', { variant: 'success' });

        deleteTask(taskId, {
            onSuccess: () => {
                enqueueSnackbar('Task deleted!', { variant: 'success' });
            },
            onError: (error) => {
                enqueueSnackbar('Failed to delete task.', { variant: 'error' });
            },
        });
    }


    return (
        <div>
            <IconButton
                className='delete-button'
                aria-label="delete"
                onClick={() => handleDeleteTask()}
                sx={{ color: 'white' }}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    )
}

export default DeleteButton