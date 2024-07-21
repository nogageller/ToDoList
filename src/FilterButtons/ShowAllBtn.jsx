import React from 'react'
import useTodos from '../hooks/useTodos';
import useFilterTodos from '../hooks/useFilterTodos';

const ShowAllBtn = () => {
    const { tasks } = useTodos({});
    const { setFilterTasks } = useFilterTodos();

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