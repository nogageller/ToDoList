import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { v4 as uuidv4 } from 'uuid';


const AddTaskDialog = ({ open, handleClose, onSave, editedTask }) => {

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        subject: '',
        priority: 0,
        isChecked: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'priority'){
            setFormData({
                ...formData,
                priority: parseInt(value)
            })
        }
        else{
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

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
                <DialogTitle className='dialog-title'>{editedTask instanceof Event ? 'Add New Task' : 'Edit Task'}</DialogTitle >
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
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-standard"
                            value={formData.subject || ''}
                            onChange={handleChange}
                            name='subject'
                        >
                            <MenuItem value="" disabled>
                                Select Task Subject
                            </MenuItem>
                            <MenuItem value="Personal">Personal</MenuItem>
                            <MenuItem value="Work">Work</MenuItem>
                            <MenuItem value="Study">Study</MenuItem>
                            <MenuItem value="Shopping">Shopping</MenuItem>
                            <MenuItem value="Health">Health</MenuItem>
                        </Select>
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