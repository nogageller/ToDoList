import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { v4 as uuidv4 } from 'uuid';
import { useAtom } from 'jotai';
import { tasksAtom } from './ToDoList';
import { useSnackbar } from 'notistack';
import TaskNameInput from './TaskDialog/TaskNameInput';
import TaskSubjectInput from './TaskDialog/TaskSubjectInput';
import TaskRatingInput from './TaskDialog/TaskRatingInput';


const TaskDialog = ({ open, handleClose, editedTask }) => {

    const [tasks, setTasks] = useAtom(tasksAtom);
    const { enqueueSnackbar } = useSnackbar();

    const [formData, setFormData] = useState(editedTask ? {
        id: editedTask.id,
        name: editedTask.name,
        subject: editedTask.subject,
        priority: editedTask.priority,
        isChecked: editedTask.isChecked,
    } : {
        id: null,
        name: '',
        subject: '',
        priority: 0,
        isChecked: false,
    });

    const handleSave = () => {
        saveTask(formData);
        handleClose();
        enqueueSnackbar(editedTask ? 'Task saved successfully!' : 'Task added successfully!', { variant: 'success' });
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
        setFormData({
            id: null,
            name: '',
            subject: '',
            priority: 0,
            isChecked: false,
        });
    };

    return (
        <>
            <Dialog className='dialog' open={open} onClose={handleClose} fullWidth >
                <DialogTitle className='dialog-title'>{editedTask ? 'Edit Task' : 'Add New Task'}</DialogTitle >
                <DialogContent className='dialog-content'>
                    <TaskNameInput
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <TaskSubjectInput
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <TaskRatingInput
                        formData={formData}
                        setFormData={setFormData} 
                    />
                </DialogContent>
                <div className='dialog-actions'>
                    <DialogActions>
                        <button className='dialog-buttons' onClick={handleSave}>{editedTask ? 'Save' : 'Add'}</button>
                        <button className='dialog-buttons' onClick={handleClose}>Cancel</button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    )
}

export default TaskDialog