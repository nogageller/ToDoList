import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import TaskDialog from './TaskDialog';
import TaskLists from './TaskLists';
import SearchInput from './SearchInput';
import FilterButtons from './FilterButtons/index';


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

            <div className='filterTasks'>
                <div className='filterDivs'>
                    <SearchInput />
                </div>
                <button className='add-button' onClick={handleDialogClickOpen}>Add new task</button>
            </div>
            <FilterButtons/>

            {
                open &&
                <TaskDialog
                    open={open}
                    handleClose={handleDialogClose}
                />
            }

            <div><br></br></div>

            <TaskLists />

        </div>
    )
}

export default ToDoList