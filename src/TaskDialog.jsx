import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TaskNameInput from './TaskDialog/TaskNameInput';
import TaskSubjectInput from './TaskDialog/TaskSubjectInput';
import TaskRatingInput from './TaskDialog/TaskRatingInput';
import CardFooter from './TaskDialog/CardFooter';

// use formik / useForm 
const TaskDialog = ({ open, handleClose, editedTask }) => {

    const defualtTask = {
        id: null,
        name: '',
        subject: '',
        priority: 0,
        isChecked: false,
    }

    const [formData, setFormData] = useState(editedTask ? {
        id: editedTask.id,
        name: editedTask.name,
        subject: editedTask.subject,
        priority: editedTask.priority,
        isChecked: editedTask.isChecked,
    } : {
        defualtTask
    });


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
                        <CardFooter
                            editedTask={editedTask}
                            formData={formData}
                            setFormData={setFormData}
                            handleClose={handleClose}
                            defualtTask={defualtTask}
                        />
                    </DialogActions>
                </div>
            </Dialog>
        </>
    )
}

export default TaskDialog