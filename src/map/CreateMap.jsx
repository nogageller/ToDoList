import React, { useEffect, useRef } from 'react'
import { useLayer, useMap } from '../hooks/useMap'
import { fromLonLat } from 'ol/proj';
import BaseLayers from './layers/BaseLayers';
import { Map, View } from 'ol';

const CreateMap = ({ children, onMapClick }) => {

    const { map, setMap } = useMap()
    const { layer } = useLayer()
    const mapRef = useRef();
    const isMapCreated = useRef(false);

    useEffect(() => {

        if (isMapCreated.current) return

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
        isMapCreated.current = true;

    }, []);

    useEffect(() => {
        if (!map || !onMapClick) return;

        let vectorSource;
        if (layer) {
            vectorSource = layer.current
        }

        map.on('click', onMapClick);

        return () => {
            map.un('click', onMapClick);
        }

    }, [map])

    return (
        <div ref={mapRef} style={{ width: '80%', height: '350px' }}>
            <BaseLayers>
                {children}
            </BaseLayers>
        </div>
    )
}

export default CreateMap