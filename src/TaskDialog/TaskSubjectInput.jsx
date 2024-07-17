import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import UseSubjects from '../hooks/useSubjects';

const TaskSubjectInput = ({ register, setValue, editedTask, watch }) => {

    const { subjectOptions } = UseSubjects()

    return (
        <div className='subjectInput'>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={subjectOptions}
                sx={{ width: 300 }}
                name='subject'
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="Subject"
                        inputRef={register('subject').ref} 
                    />
                }
                {...register('subject')}
                onChange={(event, newValue) => {
                    setValue('subject', newValue);
                }}
                value={watch('subject') || null}
                required
            />
        </div>
    )
}

export default TaskSubjectInput