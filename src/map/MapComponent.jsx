import React, { useEffect, useRef } from 'react';
import { Vector as VectorSource } from 'ol/source';
import 'ol/ol.css';
import useFilterTodos from '../hooks/useFilterTodos';
import { handleMapClick, initializeMap } from './mapUtils';
import { updateFeatures } from './featureUtils';
import GeoJSON from 'ol/format/GeoJSON';

const MapComponent = ({ onMapClick, features }) => {
    const mapRef = useRef();
    const vectorSource = useRef(new VectorSource({ features: [] }));
    const mapRefInstance = useRef();
    const { filterTasks, isFetching } = useFilterTodos();

    useEffect(() => {
        if (!mapRef.current || isFetching) return;

        if (!mapRefInstance.current) {
            mapRefInstance.current = initializeMap(mapRef.current, vectorSource.current);
        }

        if(features){
            if(features.length != 1){
                vectorSource.current.clear();   
            }
            vectorSource.current.addFeatures(features);
        }

        const handleMapClickWrapper = (event) => handleMapClick(event, vectorSource.current, onMapClick);

        if (onMapClick){
            mapRefInstance.current.on('click', handleMapClickWrapper);
        }

        return () => {
            if (mapRefInstance.current) {
                mapRefInstance.current.un('click', handleMapClickWrapper);
            }
        }

    }, [filterTasks, isFetching, onMapClick]);

    return (
        <div
            ref={mapRef}
            style={{ width: '100%', height: '400px' }}
        />
    );
};

export default MapComponent;
