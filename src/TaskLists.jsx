import React from 'react'
import Task from './Task'
import useFilterTodos from './hooks/useFilterTodos';
import useTasks from './hooks/useTasks';


const TaskLists = () => {
    //const { filterTasks } = useFilterTodos();

    const { data: tasks, isLoading, error } = useTasks(); 

    if (isLoading) return <div>Loading tasks...</div>;
    if (error) return <div>Error fetching tasks: {error.message}</div>;

    return (
        <div className='tasksContainer'>
            {tasks?.map((task) =>
                <React.Fragment key={task._id}>
                    <Task
                        task={task}
                    />
                </React.Fragment>
            )}
        </div>
    )
}

export default TaskLists