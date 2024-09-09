import React from 'react'
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, updateTask } from '../api/apiService';

const CardFooter = ({ editedTask, handleClose, handleSubmit, errors }) => {

    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const { mutate: createTaskMutation, isError: createError, isSuccess: createSuccess } = useMutation({
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

    const convertLocationToGeoJson = (location) => {
        if (location) {
            return {
                type: 'Point',
                coordinates: [location[0], location[1]]
            };
        }
        return null;
    };

    const prepareTaskData = (data) => {
        const { _id, location, ...taskWithoutId } = data;
        taskWithoutId.priority = Number(taskWithoutId.priority); 
        const geoJsonLocation = convertLocationToGeoJson(location);
        return {
            _id,
            ...taskWithoutId,
            location: geoJsonLocation
        };
    };

    const handleTaskMutation = (data) => {
        const { _id, id, ...taskData } = data;
        if (_id) {
            updateTaskMutation({ id: _id, updatedTask: taskData });
        } else {
            createTaskMutation({ ...taskData, isChecked: false });
        }
    };

    const handleSave = (data) => {
        if (!data.location) {
            return; 
        }
        const taskData = prepareTaskData(data);
        handleTaskMutation(taskData);
        handleClose(); 
    };

    return (
        <div>
            <button className='dialog-buttons' type='submit' onClick={handleSubmit(handleSave)}>{editedTask ? 'Save' : 'Add'}</button>
            {errors.location && <div className='error-message'>{errors.location.message}</div>}
            {createError && <p>Error adding task. Please try again.</p>}
            {createSuccess && <p>Task added successfully!</p>}
            <button className='dialog-buttons' type='button' onClick={handleClose}>Cancel</button>
        </div>
    )
}

export default CardFooter