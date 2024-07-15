import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { pink } from '@mui/material/colors';
import UseFilterTodos from './hooks/useFilterTodos';
import UseTodos from './hooks/useTodos';
import { useDebounce } from 'use-debounce';

const SearchInput = () => {

    const [searchInput, setSearchInput] = useState('')
    const { setFilterTasks } = UseFilterTodos();
    const { tasks } = UseTodos();
    const [debounceInput] = useDebounce(searchInput, 1000);

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchInput(value);
        if (value) {
            filterTasksBySearch();
        }
        else {
            const updatedTasks = tasks.filter(task => task);
            setFilterTasks(updatedTasks);
        }
    };

    const filterTasksBySearch = () => {
        const updatedTasks = tasks.filter(task => task.name.includes(searchInput));
        setFilterTasks(updatedTasks);
    }

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