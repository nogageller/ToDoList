import React from 'react'
import TextField from '@mui/material/TextField';

const TaskNameInput = ({ formData, setFormData }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        if ('defualtTask' in formData) {
            setFormData({
                [name]: value,
            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    return (
        <div className='taskInput'>
            <TextField
                autoFocus
                margin="dense"
                id="taskName"
                label="Task Name"
                variant="standard"
                type="text"
                name='name'
                value={formData.name || ''}
                onChange={handleChange}
            />
        </div>
    )
}

export default TaskNameInput