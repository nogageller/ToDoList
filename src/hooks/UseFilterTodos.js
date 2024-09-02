import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { atom } from 'jotai';
import useTasks from './useTasks';

export const filterOptionsAtom = atom('');

const useFilterTodos = () => {
    const { data: tasks = [], refetch, isFetching } = useTasks();
    const [filterOptions, setFilterOptions] = useAtom(filterOptionsAtom);

    const filterTasks = useMemo(() => {
        
        if (isFetching) return []; 

        switch (filterOptions) {
            case 'hideDone':
                return tasks.filter(task => !task.isChecked);
            case 'showAll':
                return [...tasks]
            case 'showDone':
                return tasks.filter(task => task.isChecked);
            case 'search':
                return tasks.filter(task => task.name.toLowerCase().includes(value.toLowerCase()))
            default:
                if (filterOptions.startsWith('search:')) {
                    const searchTerm = filterOptions.substring(7); 
                    return tasks.filter(task =>
                        task.name.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }
                return [...tasks]
        }
    }, [tasks, filterOptions, isFetching]);

    return {
        filterTasks,
        filterOptions,
        setFilterOptions,
        refetch,
    };
}

export default useFilterTodos