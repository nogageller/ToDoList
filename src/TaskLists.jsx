import React from 'react'
import Task from './Task'
import UseTodos from './hooks/UseTodos';

const TaskLists = () => {

    const {tasks} = UseTodos();

  return (
    <>
          <div className='tasksContainer'>
              {tasks?.map((task) =>
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