import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import useFilterTodos from '../hooks/useFilterTodos';
import _keyBy from 'lodash/keyBy';
import useTodos from '../hooks/useTodos';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../api/apiService';

const DeleteButton = ({ taskId }) => {
    const { tasks, setTasks } = useTodos({ keyBy: true });
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    //const { setFilterTasks } = useFilterTodos();

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        },
        onError: (error) => {
            console.error('Error deleting task:', error);
        },
    });

    const handleDeleteTask = async () => {
        const { [taskId]: deletedTask, ...remainingTasks } = tasks;
        const updatedTasks = Object.values(remainingTasks);
        setTasks(updatedTasks);

        //setFilterTasks(updatedTasks);
        
        deleteTaskMutation.mutate(taskId);
        enqueueSnackbar('Task deleted!', { variant: 'success' });
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