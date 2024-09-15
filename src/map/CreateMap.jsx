import React, { useEffect, useRef } from 'react'
import { useLayer, useMap } from '../hooks/useMap'
import { fromLonLat } from 'ol/proj';
import BaseLayers from './layers/BaseLayers';
import { Map, View } from 'ol';
import { handleMapClick } from './mapUtils';

const CreateMap = ({ children, onMapClick }) => {

    const { map, setMap } = useMap()
    const { layer, setLayer} = useLayer()
    const mapRef = useRef();

    useEffect(() => {
        console.log("CreateMap rendered");


        if (map) return;

        const center = fromLonLat([45.0, 25.0]);

        const newMap = new Map({
            view: new View({
                center: center,
                zoom: 1,
                minZoom: 2,
                maxZoom: 10,
            }),
            target: mapRef.current,
            layers: [],
        })

        setMap(newMap)

    }, [map]);

    useEffect(() => {
        if (!map || !onMapClick) return;
        console.log('layer: '+layer)

        let vectorSource;
        if(layer){
            vectorSource = layer.current
        }

        const handleMapClickWrapper = (event) => handleMapClick(event, vectorSource, onMapClick);

        map.on('click', handleMapClickWrapper);

        return () => {
            map.un('click', handleMapClickWrapper);
        }

    })

    return (
        <div ref={mapRef} style={{ width: '80%', height: '300px' }}>
            <BaseLayers>
                {children}
            </BaseLayers>
        </div>
    )
}

export default CreateMap