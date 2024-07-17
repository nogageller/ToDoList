import React from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Controller } from 'react-hook-form';

const TaskRatingInput = ({ register, setValue, control }) => {

    return (
        <Box className='boxContainer'
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                    <Rating   {...field} value={Number(field.value)} />
                )}
            />
        </Box>
    )
}

export default TaskRatingInput