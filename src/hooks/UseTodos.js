import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

export const tasksAtom = atomWithStorage('task', []);

export const UseTodos = () => {
    const [tasks, setTasks] = useAtom(tasksAtom);

    return {
        tasks,
        setTasks,
    };
}

export default UseTodos
