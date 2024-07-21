import React from 'react'
import useTodos from '../hooks/useTodos';
import { useSnackbar } from 'notistack';
import useFilterTodos from '../hooks/useFilterTodos';

const DeleteDoneBtn = () => {
    const { tasks, setTasks } = useTodos({});
    const { setFilterTasks } = useFilterTodos();
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteDone = () => {
        try {
            const updatedTasks = tasks.filter(task => task.isChecked === false);
            setTasks(updatedTasks);
            setFilterTasks(updatedTasks);
            enqueueSnackbar('Tasks deleted!', { variant: 'success' });
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