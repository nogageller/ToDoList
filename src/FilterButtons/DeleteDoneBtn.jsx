import React from 'react'
import useTodos from '../hooks/useTodos';
import { useSnackbar } from 'notistack';

const DeleteDoneBtn = () => {
    const { tasks, setTasks } = useTodos({});
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteDone = () => {
        try {
            setTasks(tasks.filter(task => task.isChecked === false));
            enqueueSnackbar('Tasks deleted!', { variant: 'success' });
            return tasks.map(task => task)
        } catch (error) {
            enqueueSnackbar('Failed to delete tasks!', { variant: 'error' });
        }
    };

    return (
        <div className='filter-button'>
            <button className='filter-buttons' onClick={handleDeleteDone}>Delete Done</button>
        </div>
    )
}

export default DeleteDoneBtn