import React from 'react'
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TaskDialog from './TaskDialog';
import DeleteButton from './TaskCard/DeleteButton';
import EditButton from './TaskCard/EditButton';
import CheckTask from './TaskCard/CheckTask';

const Task = ({ task }) => {

    const [open, setOpen] = useState(false);
    const [className, setClassName] = useState(task.isChecked ? 'checked' : 'unchecked');

    const handleDialogClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className='task'>
                <div className='task-div'>
                    <div className='task-input-div'>
                        <CheckTask
                            task={task}
                            className={className}
                            setClassName={setClassName}
                        />
                        <span className={className}>{task.name}</span>
                        <DeleteButton
                            taskId={task.id}
                        />
                        <EditButton
                            handleDialogClickOpen={handleDialogClickOpen}
                            task={task}
                        />
                        {
                            open &&
                            <TaskDialog
                                open={open}
                                handleClose={handleDialogClose}
                                editedTask={task}
                            />
                        }
                        <br></br>
                    </div>
                    <div>
                        <Typography>Subject: {task.subject}</Typography>
                        <Typography>Priority: {task.priority}</Typography>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task