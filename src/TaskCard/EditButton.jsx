import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TaskDialog from '../TaskDialog';


const EditButton = ({ task }) => {
    
    const [open, setOpen] = useState(false);

    const handleDialogClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton
                className='edit-button'
                aria-label="delete"
                onClick={() => handleDialogClickOpen()}
                sx={{ color: 'white' }}
            >
                <EditIcon />
            </IconButton>

            {
                open &&
                <TaskDialog
                    open={open}
                    handleClose={handleDialogClose}
                    editedTask={task}
                />
            }
        </div>
    )
}

export default EditButton