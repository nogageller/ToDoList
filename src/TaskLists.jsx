import React from 'react'
import Task from './Task'

const TaskLists = ({tasks, handleDialogClickOpen, setTasks, handleSnackbarClick}) => {

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        handleSnackbarClick('delete');
    }

    const handleCheckTask = (index) => {
        const updatedTasks = [...tasks];
        const isCheckedBefore = updatedTasks[index].isChecked
        updatedTasks[index] = {
            ...updatedTasks[index],
            isChecked: isCheckedBefore ? false : true,
        };
        setTasks(updatedTasks);
    }

  return (
    <>
          <div className='tasksContainer'>
              {tasks?.map((task, index) =>
                  <React.Fragment key={task.id}>
                      <Task
                          task={task}
                          index={index}
                          deleteTask={deleteTask}
                          onCheck={handleCheckTask}
                          tasks={tasks}
                          handleSnackbarClick={handleSnackbarClick}
                          setTasks={setTasks}
                      />
                  </React.Fragment>
              )}
          </div>
    </>
  )
}

export default TaskLists