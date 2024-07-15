import React from 'react'
import UseTodos from '../hooks/useTodos';
import { useSnackbar } from 'notistack';
import UseFilterTodos from '../hooks/useFilterTodos';

const DeleteDoneBtn = () => {

    const { tasks, setTasks } = UseTodos();
    const { setFilterTasks } = UseFilterTodos();
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteDone = () => {
        try {
            const updatedTasks = tasks.filter(task => task.isChecked === false);
            setTasks(updatedTasks);
            setFilterTasks(updatedTasks);
            enqueueSnackbar('Tasks deleted!', { variant: 'success' });
        } catch (error) {
            console.error('Error deleting tasks:', error);
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