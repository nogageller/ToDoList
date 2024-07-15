import React from 'react'
import UseTodos from './hooks/UseTodos';
import { useSnackbar } from 'notistack';
import UseFilterTodos from './hooks/UseFilterTodos';

const FilterButtons = () => {

    const { tasks, setTasks } = UseTodos();
    const { filterTasks, setFilterTasks } = UseFilterTodos();
    const { enqueueSnackbar } = useSnackbar();

    const handleHideDone = () => {
        const updatedTasks = tasks.filter(task => task.isChecked === false);
        setFilterTasks(updatedTasks);
    };

    const handleDeleteDone = () => {
        const updatedTasks = tasks.filter(task => task.isChecked === false);
        setTasks(updatedTasks);
        setFilterTasks(updatedTasks);
        enqueueSnackbar('Tasks deleted!', { variant: 'success' }); // try catch succ if not error, in the catch use error snackbar
    };

    const handleShowDone = () => {
        const updatedTasks = tasks.filter(task => task.isChecked === true);
        setFilterTasks(updatedTasks);
    };

    const handleShowAll = () => {
        const updatedTasks = [...tasks]
        setFilterTasks(updatedTasks);
    };

    // create fofer named filterButton, and file for each btn

    return (
        <div>
            <button className='filter-buttons' onClick={handleHideDone}>Hide Done</button>
            <button className='filter-buttons' onClick={handleDeleteDone}>Delete Done</button>
            <button className='filter-buttons' onClick={handleShowDone}>Show Done</button>
            <button className='filter-buttons' onClick={handleShowAll}>Show All</button>
        </div>
    )
}

export default FilterButtons