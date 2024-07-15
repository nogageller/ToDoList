import React from 'react'
import UseTodos from '../hooks/useTodos';
import UseFilterTodos from '../hooks/useFilterTodos';

const ShowDoneBtn = () => {

    const { tasks } = UseTodos();
    const { setFilterTasks } = UseFilterTodos();

    const handleShowDone = () => {
        const updatedTasks = tasks.filter(task => task.isChecked === true);
        setFilterTasks(updatedTasks);
    };

    return (
        <div className='filter-button'>
            <button className='filter-buttons' onClick={handleShowDone}>Show Done</button>
        </div>
    )
}

export default ShowDoneBtn