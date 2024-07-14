import React from 'react'
import { useSnackbar } from 'notistack';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import UseTodos from '../hooks/UseTodos';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        color: pink[800],
        '&.Mui-checked': {
            color: pink[600],
        },
    },
}));

const CheckTask = ({ task, className, setClassName }) => {

    const classes = useStyles();

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
                className={classes.root}
            />
        </div>
    )
}

export default CheckTask