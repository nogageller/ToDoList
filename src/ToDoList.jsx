import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import TaskDialog from './TaskDialog';
import TaskLists from './TaskLists';
import SearchInput from './SearchInput';
import FilterButtons from './FilterButtons/index';
import MapContainer from './map/MapContainer';

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
                    <FilterButtons />
            <div><br></br></div>

            <div className='bodyContainer'>
                <div className='box1'>
                    <TaskLists />
                </div>
                <div className='box2'>
                    <MapContainer/>
                </div>
            </div>
            {
                open &&
                <TaskDialog
                    open={open}
                    handleClose={handleDialogClose}
                />
            }
        </div>
    )
}

export default ToDoList