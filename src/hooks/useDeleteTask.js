import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../api/apiService';

const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask, 
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        },
        onError: (error) => {
            console.error('Error deleting task:', error);
        },
    });
};

export default useDeleteTask;
