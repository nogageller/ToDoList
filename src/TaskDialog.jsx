import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TaskNameInput from './TaskDialog/TaskNameInput';
import TaskSubjectInput from './TaskDialog/TaskSubjectInput';
import TaskRatingInput from './TaskDialog/TaskRatingInput';
import CardFooter from './TaskDialog/CardFooter';
import { useForm } from 'react-hook-form';
import { Provider } from 'jotai';
import MapDialog from './map/MapDialog';

const TaskDialog = ({ open, handleClose, editedTask }) => {

    const defaultTask = {
        id: null,
        name: '',
        subject: '',
        priority: 0,
        location: null,
    }

    const { register, handleSubmit, control, setValue, watch, formState: { errors }, } = useForm({
        defaultValues: editedTask || defaultTask,
        mode: 'onSubmit'
    });

    return (
        <>
            <Provider>
                <Dialog className='dialog' open={open} onClose={handleClose} fullWidth >
                    <DialogTitle className='dialog-title'>{editedTask ? 'Edit Task' : 'Add New Task'}</DialogTitle >
                    <DialogContent className='dialog-content'>
                        <form>
                            <TaskNameInput
                                register={register}
                                errors={errors}
                            />
                            <TaskSubjectInput
                                register={register}
                                setValue={setValue}
                                editedTask={editedTask}
                                watch={watch}
                                errors={errors}
                            />
                            <TaskRatingInput
                                control={control}
                            />
                            <MapDialog editedTask={editedTask} setValue={setValue} />

                            {errors.location && <div className='error-message'>{errors.location.message}</div>}
                            <div className='dialog-actions'>
                                <DialogActions>
                                    <CardFooter
                                        editedTask={editedTask}
                                        handleClose={handleClose}
                                        handleSubmit={handleSubmit}
                                        errors={errors}
                                    />
                                </DialogActions>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </Provider>
        </>
    )
}

export default TaskDialog