import React from 'react'
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import DeleteButton from './TaskCard/DeleteButton';
import EditButton from './TaskCard/EditButton';
import CheckTask from './TaskCard/CheckTask';

const Task = ({ task }) => {

    const [className, setClassName] = useState(task.isChecked ? 'checked' : 'unchecked');

    return (
        < div className='task' >
            <div className='task-div'>
                <div className='task-input-div'>
                    <CheckTask
                        task={task}
                        className={className}
                        setClassName={setClassName}
                    />
                    <span className={className}>{task.name}</span>
                    <DeleteButton
                        taskId={task._id}
                    />
                    <EditButton
                        task={task}
                    />
                    <br></br>
                </div>
                <div>
                    <Typography variant="caption">Subject: {task.subject}</Typography>
                    <br></br>
                    <Typography variant="caption">Priority: {task.priority}</Typography>
                </div>
            </div>
        </div >
    )
}

export default Task