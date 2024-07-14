import React from 'react'
import Task from './Task'
import UseTodos from './hooks/UseTodos';
import UseFilterTodos from './hooks/UseFilterTodos';

const TaskLists = () => {

    const {tasks} = UseTodos();
    const { filterTasks, setFilterTasks } = UseFilterTodos();

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