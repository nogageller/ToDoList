import React from 'react'
import { useSnackbar } from 'notistack';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import useTodos from '../hooks/useTodos';
import { makeStyles } from '@mui/styles';
// import useFilterTodos from '../hooks/useFilterTodoss';
import _ from 'lodash';

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

    const { tasks, setTasks } = useTodos({ keyBy: false });
    const { enqueueSnackbar } = useSnackbar();
    //const { setFilterTasks } = useFilterTodos();

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const toggleTask = () => {
        setClassName(className === 'unchecked' ? 'checked' : 'unchecked');
        if (className == 'unchecked') {
            enqueueSnackbar('Task checked!', { variant: 'success' });
        }
        handleCheckTask()
    }

    const handleCheckTask = () => {
        const tasksKeyedBy = _.keyBy(tasks, 'id');
        const taskId = task.id

        if (tasksKeyedBy.hasOwnProperty(taskId)) {
            const task = tasksKeyedBy[taskId];
            const updatedTask = { ...task, isChecked: !task.isChecked };
            const updatedTasksKeyedBy = {
                ...tasksKeyedBy,
                [taskId]: updatedTask
            };
            const updatedTasksArray = Object.values(updatedTasksKeyedBy);

            setTasks(updatedTasksArray)
            //setFilterTasks(updatedTasksArray);
        }
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