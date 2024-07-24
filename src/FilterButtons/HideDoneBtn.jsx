import React from 'react'
import useFilterTodos from '../hooks/useFilterTodos';

const HideDoneBtn = () => {
    const { setFilterOptions } = useFilterTodos();

    const handleHideDone = () => {
        setFilterOptions('hideDone')
    };

    return (
        <div className='filter-button'>
            <button className='filter-buttons' onClick={handleHideDone}>Hide Done</button>
        </div>
    )
}

export default HideDoneBtn