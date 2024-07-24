import React from 'react'
import useFilterTodos from '../hooks/useFilterTodos';

const ShowDoneBtn = () => {
    const { setFilterOptions } = useFilterTodos();

    const handleShowDone = () => {
        setFilterOptions('showDone');
    };

    return (
        <div className='filter-button'>
            <button className='filter-buttons' onClick={handleShowDone}>Show Done</button>
        </div>
    )
}

export default ShowDoneBtn