import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

export const filterTasksAtom = atomWithStorage('filterTasks', []);

export const UseFilterTodos = () => {
    const [filterTasks, setFilterTasks] = useAtom(filterTasksAtom);

    return {
        filterTasks,
        setFilterTasks,
    };
}

export default UseFilterTodos