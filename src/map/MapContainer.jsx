import React from 'react'
import useFilterTodos from '../hooks/useFilterTodos';
import CreateMap from './CreateMap';
import TaskLayer from './layers/TaskLayer';

const MapContainer = () => {

    const { filterTasks, isFetching } = useFilterTodos();

    return (
        <CreateMap>
            <TaskLayer array={filterTasks} isFetching={isFetching} />
        </CreateMap>
    )
}

export default MapContainer