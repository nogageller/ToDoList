import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import useSubjects from '../hooks/useSubjects';

const TaskSubjectInput = ({ register, setValue, watch, errors }) => {

    const { data: subjects } = useSubjects();
    const subjectOptions = subjects?.map(subject => subject.name) || [];

    return (
        <div>
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
                    {...register('subject', {
                        required: "Subject is required",
                    })}
                    onChange={(event, newValue) => {
                        setValue('subject', newValue);
                    }}
                    value={watch('subject') || null}
                    required
                />
            </div>
            {errors.subject && (
                <div className='error-message'>{errors.subject.message}</div>
            )}
        </div>
    )
}

export default TaskSubjectInput