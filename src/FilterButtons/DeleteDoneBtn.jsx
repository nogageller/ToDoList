import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoneTasks } from '../api/apiService';
import { useSnackbar } from 'notistack';

const DeleteDoneBtn = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const deleteDoneTaskMutation = useMutation({
        mutationFn: deleteDoneTasks,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        },
        onError: (error) => {
            console.error('Error deleting task:', error);
        },
    });


    const handleDeleteDone = () => {
        deleteDoneTaskMutation.mutate();
        enqueueSnackbar('Tasks deleted!', { variant: 'success' });
    };

    return (
        <div className='filter-button'>
            <button className='filter-buttons' onClick={handleDeleteDone}>Delete Done</button>
        </div>
    )
}

export default DeleteDoneBtn