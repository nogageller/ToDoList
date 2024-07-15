import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const TaskSubjectInput = ({formData, setFormData}) => {
    // move to useSubjects hook for prepare to conect with server side
    const subjectOptions = ["Personal", "Work", "Study", "Shopping", "Health"];

    const handleAutoCompleteInput = (e, value) => {
        if ('defualtTask' in formData) {
            setFormData({
                ['subject']: value,
            });
        }
        else {
            setFormData({
                ...formData,
                ['subject']: value,
            });
        }
    }

  return (
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
  )
}

export default TaskSubjectInput