import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/apiService'; 

const useTasks = (filter = '') => {
    return useQuery({
        queryKey: ['tasks', filter], 
        queryFn: () => getTasks(filter), 
        staleTime: 30000,
        refetchOnWindowFocus: true,
    });
};

export default useTasks;
