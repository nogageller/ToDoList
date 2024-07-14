import React from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const TaskRatingInput = ({formData, setFormData}) => {

    const handleChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            priority: parseInt(value)
        })
    };

    return (
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
    )
}

export default TaskRatingInput