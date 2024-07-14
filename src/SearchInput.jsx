import { TextField } from '@mui/material'
import React from 'react'
import { pink } from '@mui/material/colors';

const SearchInput = () => {
  return (
    <div>
          <TextField
              autoFocus
              margin="dense"
              id="searchTask"
              label="Search tasks..."
              variant="outlined"
              type="text"
              name='searchTask'
              sx={{
                  bgcolor: 'white',
                  borderRadius: '20px',
                  '& .MuiInputLabel-root': {
                      color: pink[600],
                  },
                  '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                          borderColor: 'white',
                      },
                  },
                  '& .MuiFormLabel-root.Mui-focused': {
                      color: pink[600],
                  },
              }}
              //value={formData.name || ''}
              //onChange={handleChange}
          />
    </div>
  )
}

export default SearchInput