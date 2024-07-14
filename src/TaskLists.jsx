import React from 'react'
import Task from './Task'
import { useAtom } from 'jotai';
import { tasksAtom } from './ToDoList';

const TaskLists = () => {

    const [tasks] = useAtom(tasksAtom);

  return (
    <>
          <div className='tasksContainer'>
              {tasks?.map((task, index) =>
                  <React.Fragment key={task.id}>
                      <Task
                          task={task}
                          index={index}
                      />
                  </React.Fragment>
              )}
          </div>
    </>
  )
}

export default TaskLists