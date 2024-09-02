import React from 'react'
import { useSnackbar } from 'notistack';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTaskCompletion } from '../api/apiService';

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

    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const checkTaskMutation = useMutation({
        mutationFn: updateTaskCompletion,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        },
        onError: (error) => {
            console.error('Error deleting task:', error);
        },
    });

    const toggleTask = () => {
        setClassName(className === 'unchecked' ? 'checked' : 'unchecked');
        if (className == 'unchecked') {
            enqueueSnackbar('Task checked!', { variant: 'success' });
        }
        checkTaskMutation.mutate(task);
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