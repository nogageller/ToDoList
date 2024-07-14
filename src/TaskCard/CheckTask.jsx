import React from 'react'
import { useSnackbar } from 'notistack';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import UseTodos from '../hooks/UseTodos';

const CheckTask = ({ task, className, setClassName }) => {
    const {tasks, setTasks} = UseTodos();
    const { enqueueSnackbar } = useSnackbar();

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const toggleTask = () => {
        setClassName(className === 'unchecked' ? 'checked' : 'unchecked');
        if (className == 'unchecked') {
            enqueueSnackbar('Task checked!', { variant: 'success' });
        }
        handleCheckTask()
    }

    const handleCheckTask = () => {
        const taskId = task.id
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId
                    ? { ...task, isChecked: !task.isChecked }
                    : task
            )
        );
    }

    return (
        <div>
            <Checkbox
                checked={task.isChecked}
                onChange={toggleTask}
                {...label}
                sx={{
                    color: pink[800],
                    '&.Mui-checked': {
                        color: pink[600],
                    },
                }}
            />
        </div>
    )
}

export default CheckTask