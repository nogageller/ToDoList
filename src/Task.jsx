import React from 'react'
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import TaskDialog from './TaskDialog';
import { useAtom } from 'jotai';
import { tasksAtom } from './ToDoList';
import DeleteButton from './TaskCard/DeleteButton';
import EditButton from './TaskCard/EditButton';

const Task = ({ task, index }) => {

    const [tasks, setTasks] = useAtom(tasksAtom);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [className, setClassName] = useState(task.isChecked ? 'checked' : 'unchecked');
    const [open, setOpen] = useState(false);

    const handleDialogClickOpen = (task) => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const toggleTask = () => {
        setClassName(className === 'unchecked' ? 'checked' : 'unchecked');
        handleCheckTask(index)
    }

    const handleCheckTask = (index) => {
        const updatedTasks = [...tasks];
        const isCheckedBefore = updatedTasks[index].isChecked
        updatedTasks[index] = {
            ...updatedTasks[index],
            isChecked: !isCheckedBefore,
        };
        setTasks(updatedTasks);
    }

    return (
        <>
            <div className='task'>
                <div className='task-div'>
                    <div className='task-input-div'>
                        <Checkbox
                            checked={task.isChecked}
                            onChange={toggleTask}
                            {...label}
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }}
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