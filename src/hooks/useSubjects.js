import { useQuery } from '@tanstack/react-query';
import { getSubjects } from '../api/apiService';

const useSubjects = () => {
    return useQuery({
        queryKey: ['subjects'],
        queryFn: getSubjects,
        staleTime: 30000,
        refetchOnWindowFocus: true,
    });
};

export default useSubjects;

