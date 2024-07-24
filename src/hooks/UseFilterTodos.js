import { useAtom } from 'jotai';
import useTodos from './useTodos';
import { useMemo } from 'react';
import { atom } from 'jotai';

export const filterOptionsAtom = atom('');

const useFilterTodos = () => {
    const { tasks } = useTodos({ keyBy: false });
    const [filterOptions, setFilterOptions] = useAtom(filterOptionsAtom);

    const filterTasks = useMemo(() => {
        switch (filterOptions) {
            case 'hideDone':
                return tasks.filter(task => task.isChecked === false);
            case 'showAll':
                return [...tasks]
            case 'showDone':
                return tasks.filter(task => task.isChecked === true);
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
    }, [tasks, filterOptions]);

    return {
        filterTasks,
        filterOptions,
        setFilterOptions,
    };
}

export default useFilterTodos