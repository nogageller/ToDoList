import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

export const filterTasksAtom = atomWithStorage('filterTasks', []);

export const useFilterTodos = () => {
    const [filterTasks, setFilterTasks] = useAtom(filterTasksAtom);

    return {
        filterTasks,
        setFilterTasks,
    };
}

export default useFilterTodos