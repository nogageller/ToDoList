import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Task from './Task';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import AddTaskDialog from './AddTaskDialog';

const ToDoList = () => {

    const intialListLocalStorage = JSON.parse(localStorage.getItem('myList'));

    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState(intialListLocalStorage || []);
    const [editedTask, setEditedTask] = useState(null);

    const handleDialogClickOpen = (task) => {
        setEditedTask(task);
        setOpen(true);
    };

    const handleDialogClose = () => {
        setEditedTask(null);
        setOpen(false);
    };


    const saveTask = (updatedTask) => {
        if (updatedTask.id) {
            const updatedTasks = tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            );
            setTasks(updatedTasks);
        } 
        else {
            // Add new task
            updatedTask.id = uuidv4();
            updatedTask.isChecked = false;
            setTasks([...tasks, updatedTask]);
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    const handleCheckTask = (index) => {
        const updatedTasks = [...tasks];
        const isCheckedBefore = updatedTasks[index].isChecked
        updatedTasks[index] = {
            ...updatedTasks[index],
            isChecked: isCheckedBefore ? false: true,
        };
        setTasks(updatedTasks);
    }

    useEffect(() => {
        localStorage.setItem('myList', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const dataFromStorage = localStorage.getItem('myList');
        if (dataFromStorage !== null) {
            setTasks(JSON.parse(dataFromStorage));
        }
    }, []);

    return (
        <div>

            <Typography variant='h2' className='title'>To Do List</Typography>

            <button className='add-button' onClick={handleDialogClickOpen}>Add new task</button>

            <AddTaskDialog
                open={open}
                handleClose={handleDialogClose}
                onSave={saveTask}
                editedTask={editedTask}
            />

            <div><br></br></div>

            <div className='tasksContainer'>
                {tasks?.map((task, index) =>
                    <React.Fragment key={task.id}>
                        <Task
                            task={task}
                            index={index}
                            deleteTask={deleteTask}
                            onEdit={handleDialogClickOpen}
                            onCheck={handleCheckTask}
                        />
                    </React.Fragment>
                )}
            </div>

        </div>
    )
}

export default ToDoList