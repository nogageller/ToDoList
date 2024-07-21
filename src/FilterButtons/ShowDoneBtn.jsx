import React from 'react'
import useTodos from '../hooks/useTodos';
import useFilterTodos from '../hooks/useFilterTodos';

const ShowDoneBtn = () => {
    const { tasks } = useTodos();
    const { setFilterTasks } = useFilterTodos();

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