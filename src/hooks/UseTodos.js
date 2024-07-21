import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'
import _keyBy from 'lodash/keyBy';
import { useMemo } from 'react';

export const tasksAtom = atomWithStorage('tasks', []);

const useTodos = ({ keyBy = false }) => {
    const [tasks, setTasks] = useAtom(tasksAtom);

    const computedTasks = useMemo(() => {
        if (keyBy) {
            return _keyBy(tasks, 'id')
        }
        return tasks
    }, [tasks, keyBy])

    return {
        tasks: computedTasks,
        setTasks,
    };
}

export default useTodos
