import React from 'react'
import Task from './Task'
import useFilterTodos from './hooks/useFilterTodos';

const TaskLists = () => {
    const { filterTasks } = useFilterTodos();

    return (
        <>
            <div className='tasksContainer'>
                {filterTasks?.map((task) =>
                    <React.Fragment key={task.id}>
                        <Task
                            task={task}
                        />
                    </React.Fragment>
                )}
            </div>
        </>
    )
}

export default TaskLists