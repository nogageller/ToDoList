import React from 'react'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


const EditButton = ({ handleDialogClickOpen, task }) => {

    return (
        <div>
            <IconButton
                className='edit-button'
                aria-label="delete"
                onClick={() => handleDialogClickOpen(task)}
                sx={{ color: 'white' }}
            >
                <EditIcon />
            </IconButton>
        </div>
    )
}

export default EditButton