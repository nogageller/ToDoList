import React from 'react'
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, updateTask } from '../api/apiService';

const CardFooter = ({ editedTask, handleClose, handleSubmit }) => {

    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const { mutate: createTaskMutation, isError: deleteError, isSuccess: deleteSuccess } = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
            enqueueSnackbar('Task added successfully!', { variant: 'success' });
        },
        onError: () => {
            enqueueSnackbar('Failed to add task.', { variant: 'error' });
        },
    });

    const { mutate: updateTaskMutation, isLoading: isUpdating, isError: updateError, isSuccess: updateSuccess } = useMutation({
        mutationFn: ({ id, updatedTask }) => updateTask({ id, updatedTask }),
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
            enqueueSnackbar('Task updated successfully!', { variant: 'success' });
        },
        onError: (error) => {
            enqueueSnackbar('Failed to update task.', { variant: 'error' });
            console.error('Error updating task:', error);
        },
    });

    const handleSave = (data) => {
        //convert the data to suitable json
        const { _id, id, ...taskWithoutId } = data;
        taskWithoutId.priority = Number(taskWithoutId.priority);
        const jsonString = JSON.stringify(taskWithoutId);
        let replaceJson = jsonString.replace(/'/g, '"');
        let jsonObject = JSON.parse(replaceJson);
        let updatedTask = jsonObject

        if (_id) {
            updateTaskMutation({ id: _id, updatedTask })
        } else {
            let newTask = {...jsonObject, isChecked: false};
            createTaskMutation(newTask)
        }

        handleClose();
    };

    return (
        <div>
            <button className='dialog-buttons' type='submit' onClick={handleSubmit(handleSave)}>{editedTask ? 'Save' : 'Add'}</button>
            {deleteError && <p>Error adding task. Please try again.</p>}
            {deleteSuccess && <p>Task added successfully!</p>}
            <button className='dialog-buttons' type='button' onClick={handleClose}>Cancel</button>
        </div>
    )
}

export default CardFooter