import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { pink } from '@mui/material/colors';
import UseFilterTodos from './hooks/useFilterTodos';
import UseTodos from './hooks/useTodos';
import { useDebouncedCallback } from 'use-debounce';

const SearchInput = () => {

    const [searchInput, setSearchInput] = useState('')
    const { setFilterTasks } = UseFilterTodos();
    const { tasks } = UseTodos();

    const debounceFunction = useDebouncedCallback((value) => {

        const filteredTasks = value
            ? tasks.filter(task =>
                task.name.toLowerCase().includes(value.toLowerCase())
            )
            : tasks;

        setFilterTasks(filteredTasks);
    }, 1000);


    const handleChange = (e) => {
        const { value } = e.target;
        setSearchInput(value);
        debounceFunction(value);
    };

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
                value={searchInput || ''}
                onChange={handleChange}
            />
        </div>
    )
}

export default SearchInput