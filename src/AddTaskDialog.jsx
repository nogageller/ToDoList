import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { v4 as uuidv4 } from 'uuid';
import Autocomplete from '@mui/material/Autocomplete';


const AddTaskDialog = ({ open, handleClose, onSave, editedTask }) => {

    const subjectOptions = ["Personal", "Work", "Study", "Shopping", "Health"];

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        subject: '',
        priority: 0,
        isChecked: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'priority') {
            setFormData({
                ...formData,
                priority: parseInt(value)
            })
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleAutoCompleteInput = (e, value) => {
        setFormData({
            ...formData,
            ['subject']: value,
        });

    }

    const handleSave = () => {
        onSave(formData);
        handleClose();
    };

    useEffect(() => {
        if (editedTask) {
            setFormData({
                id: editedTask.id,
                name: editedTask.name,
                subject: editedTask.subject,
                priority: editedTask.priority,
                isChecked: editedTask.isChecked,
            });
        } else {
            setFormData({
                id: uuidv4(),
                name: '',
                subject: '',
                priority: 0,
                isChecked: false,
            });
        }
    }, [editedTask]);

    return (
        <>
            <Dialog className='dialog' open={open} onClose={handleClose} fullWidth >
                <DialogTitle className='dialog-title'>{editedTask ? 'Add New Task' : 'Edit Task'}</DialogTitle >
                <DialogContent className='dialog-content'>
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
                    <div className='subjectInput'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={subjectOptions}
                            sx={{ width: 300 }}
                            onChange={handleAutoCompleteInput}
                            name='subject'
                            value={formData.subject || null}
                            renderInput={(params) => <TextField {...params} label="Subject" />}
                        />
                    </div>
                    <Box className='boxContainer'
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                    >
                        <Rating
                            name="priority"
                            value={formData.priority || 0}
                            onChange={handleChange}
                        />
                    </Box>
                </DialogContent>
                <div className='dialog-actions'>
                    <DialogActions>
                        <button className='dialog-buttons' onClick={handleSave}>{editedTask === null ? 'Save' : 'Add'}</button>
                        <button className='dialog-buttons' onClick={handleClose}>Cancel</button>
                    </DialogActions>
                </div>

            </Dialog>

        </>
    )
}

export default AddTaskDialog