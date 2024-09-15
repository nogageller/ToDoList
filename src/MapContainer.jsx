import React, { useRef } from 'react'
import MapComponent from './map/MapComponent'
import useFilterTodos from './hooks/useFilterTodos';
import { convertToFeatures } from './map/featureUtils';
import CreateMap from './map/CreateMap';
import TaskLayer from './map/layers/TaskLayer';
import VectorSource from 'ol/source/Vector';

const MapContainer = () => {

    const { filterTasks, isFetching } = useFilterTodos();
    const features = !isFetching ? convertToFeatures(filterTasks) : [];

    return (
        <CreateMap>
            <TaskLayer features={features} />
        </CreateMap>
    )
}

export default MapContainer