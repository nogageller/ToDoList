import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { pink } from '@mui/material/colors';
import UseFilterTodos from './hooks/UseFilterTodos';
import UseTodos from './hooks/UseTodos';

const SearchInput = () => {

    const [searchInput, setSearchInput] = useState('')
    const { setFilterTasks } = UseFilterTodos();
    const { tasks } = UseTodos();

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

    // useEffect(() => {
    //     const handler = setTimeout(() => {
    //         console.log(searchInput);
    //         if (searchInput) {
    //             const updatedTasks = tasks.filter(task => task.name.includes(searchInput));
    //             setFilterTasks(updatedTasks);
    //         }
    //         else {
    //             const updatedTasks = tasks.filter(task => task);
    //             setFilterTasks(updatedTasks);
    //         }
    //     }, 300);

    //     return () => {
    //         clearTimeout(handler);
    //     };
    // }, [searchInput]);

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