import React from 'react'
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';

const Task = ({ key, task, index, deleteTask, onEdit, onCheck }) => {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [className, setClassName] = useState(task.isChecked ? 'checked' : 'unchecked');

    const toggleTask = () => {
        setClassName(className === 'unchecked' ? 'checked' : 'unchecked');
        onCheck(index)
    }

    const handleEditClicked = () => onEdit(task)

    return (
        <>
            <div key={key} className='task'>
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
                        <div className='action-buttonsDiv'>
                            <button className='delete-button' onClick={() => deleteTask(index)}></button>
                            <button className='edit-button' disabled={task.isChecked} onClick={handleEditClicked}></button>
                        </div>
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