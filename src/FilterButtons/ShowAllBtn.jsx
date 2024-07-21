import React from 'react'
import UseTodos from '../hooks/useTodos';
import UseFilterTodos from '../hooks/useFilterTodos';

const ShowAllBtn = () => {
    const { tasks } = UseTodos();
    const { setFilterTasks } = UseFilterTodos();

    const handleShowAll = () => {
        const updatedTasks = [...tasks]
        setFilterTasks(updatedTasks);
    };

    return (
        <div className='filter-button'>
            <button className='filter-buttons' onClick={handleShowAll}>Show All</button>
        </div>
    )
}

export default ShowAllBtn