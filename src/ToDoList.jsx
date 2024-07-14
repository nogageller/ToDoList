import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import TaskDialog from './TaskDialog';
import TaskLists from './TaskLists';


const ToDoList = () => {

    const [open, setOpen] = useState(false);

    const handleDialogClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Typography variant='h2' className='title'>To Do List</Typography>

            <button className='add-button' onClick={handleDialogClickOpen}>Add new task</button>

            {
                open &&
                <TaskDialog
                    open={open}
                    handleClose={handleDialogClose}
                />
            }

            <div><br></br></div>

            <TaskLists/>

        </div>
    )
}

export default ToDoList