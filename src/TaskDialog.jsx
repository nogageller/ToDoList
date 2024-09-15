import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TaskNameInput from './TaskDialog/TaskNameInput';
import TaskSubjectInput from './TaskDialog/TaskSubjectInput';
import TaskRatingInput from './TaskDialog/TaskRatingInput';
import CardFooter from './TaskDialog/CardFooter';
import { useForm } from 'react-hook-form';
import MapComponent from './map/MapComponent';
import { convertToFeatures } from './map/featureUtils';
import CreateMap from './map/CreateMap';
import MapClickHandler from './map/MapClickHandler';
import TaskLayer from './map/layers/TaskLayer';
import { Provider } from 'jotai';

const TaskDialog = ({ open, handleClose, editedTask }) => {

    // const [features, setFeatures] = useState()

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

    const handleMapClick = (location) => {
        setValue('location', location, { shouldValidate: true });
    }

    let features;

    if (editedTask) {
        features = convertToFeatures([editedTask]);
        // setFeatures(feature);
    }

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
                            <CreateMap onMapClick={handleMapClick}>
                                <TaskLayer features={features || undefined} />
                            </CreateMap>
                        </form>
                    </DialogContent>
                </Dialog>
            </Provider>
        </>
    )
}

export default TaskDialog