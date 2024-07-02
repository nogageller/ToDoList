import React from 'react'

const TaskList = ({ handleInputChange, tasks, addTask, newTask }) => {
    return (
        <div>
            <h1>ToDoList</h1>

            <div>
                <input
                    type='text'
                    placeholder='Add new task...'
                    value={newTask.task || ''}
                    onChange={handleInputChange} />
                <button className='add-button' onClick={addTask}>Add</button>
            </div>
        </div>
    )
}

export default TaskList