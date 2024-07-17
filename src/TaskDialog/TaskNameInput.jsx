import React from 'react'
import TextField from '@mui/material/TextField';

const TaskNameInput = ({register, errors}) => {

    return (
        <div>
            <div className='taskInput'>
                <TextField
                    autoFocus
                    margin="dense"
                    id="taskName"
                    label="Task Name"
                    variant="standard"
                    type="text"
                    name='name'
                    {...register('name' , {
                        required: "Name is required",
                    })}
                    required
                />
            </div>
                {errors.name && (
                    <div className='error-message'>{errors.name.message}</div>
                )}
        </div>
    )
}

export default TaskNameInput