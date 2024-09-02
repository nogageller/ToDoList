import React from 'react'
import Task from './Task'
import useFilterTodos from './hooks/useFilterTodos';

const TaskLists = () => {
    const { filterTasks, isFetching, error } = useFilterTodos();

    if (isFetching) return <div>Loading tasks...</div>;
    if (error) return <div>Error fetching tasks: {error.message}</div>;

    return (
        <div className='tasksContainer'>
            {filterTasks.length === 0 ? (
                <div>No tasks found.</div>
            ) : (
                filterTasks.map(task => (
                    <React.Fragment key={task._id}>
                        <Task task={task} />
                    </React.Fragment>
                ))
            )}
        </div>
    )
}

export default TaskLists