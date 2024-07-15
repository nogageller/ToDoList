import React from 'react'
import UseTodos from '../hooks/useTodos';
import UseFilterTodos from '../hooks/useFilterTodos';

const HideDoneBtn = () => {

    const { tasks } = UseTodos();
    const { setFilterTasks } = UseFilterTodos();

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