import React from 'react'
import useTodos from '../hooks/useTodos';
import useFilterTodos from '../hooks/useFilterTodos';

const HideDoneBtn = () => {
    const { tasks } = useTodos();
    const { setFilterTasks } = useFilterTodos();

    const handleHideDone = () => {
        const updatedTasks = tasks.filter(task => task.isChecked === false);
        setFilterTasks(updatedTasks);
    };

    return (
        <div className='filter-button'>
            <button className='filter-buttons' onClick={handleHideDone}>Hide Done</button>
        </div>
    )
}

export default HideDoneBtn