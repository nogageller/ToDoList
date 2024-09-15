import React from 'react'
import useFilterTodos from './hooks/useFilterTodos';
import CreateMap from './map/CreateMap';
import ConvertToFeatures from './map/ConvertToFeatures';

const MapContainer = () => {

    const { filterTasks, isFetching } = useFilterTodos();

    return (
        <CreateMap>
            <ConvertToFeatures array={filterTasks} isFetching={isFetching}/>
        </CreateMap>
    )
}

export default MapContainer