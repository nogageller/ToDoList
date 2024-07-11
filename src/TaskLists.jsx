import React from 'react'
import Task from './Task'
import { useAtom } from 'jotai';
import { tasksAtom } from './ToDoList';

const TaskLists = ({handleSnackbarClick}) => {

    const [tasks] = useAtom(tasksAtom);

  return (
    <>
          <div className='tasksContainer'>
              {tasks?.map((task, index) =>
                  <React.Fragment key={task.id}>
                      <Task
                          task={task}
                          index={index}
                          handleSnackbarClick={handleSnackbarClick}
                      />
                  </React.Fragment>
              )}
          </div>
    </>
  )
}

export default TaskLists