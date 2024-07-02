import React from 'react'
import Task from './Task'

const TaskLists = ({tasks, deleteTask, handleDialogClickOpen, handleCheckTask}) => {
  return (
    <>
          <div className='tasksContainer'>
              {tasks?.map((task, index) =>
                  <React.Fragment key={task.id}>
                      <Task
                          task={task}
                          index={index}
                          deleteTask={deleteTask}
                          onEdit={handleDialogClickOpen}
                          onCheck={handleCheckTask}
                      />
                  </React.Fragment>
              )}
          </div>
    </>
  )
}

export default TaskLists