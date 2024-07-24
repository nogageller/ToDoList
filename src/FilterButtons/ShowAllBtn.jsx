import React from 'react'
import useFilterTodos from '../hooks/useFilterTodos';

const ShowAllBtn = () => {
    const { setFilterOptions } = useFilterTodos();

    const handleShowAll = () => {
        setFilterOptions('showAll');
    };

    return (
        <div className='filter-button'>
            <button className='filter-buttons' onClick={handleShowAll}>Show All</button>
        </div>
    )
}

export default ShowAllBtn