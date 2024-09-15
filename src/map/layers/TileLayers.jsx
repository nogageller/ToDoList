import React, { useEffect, useRef } from 'react'
import { useMap } from '../../hooks/useMap'
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';

const TileLayers = () => {

    const { map } = useMap();
    const layerRef = useRef()

    useEffect(() => {
        if (!map || layerRef.current) return;

        layerRef.current = new TileLayer({
            source: new OSM()
        });

        map.addLayer(layerRef.current)

        return () => {
            if (layerRef.current) {
                map.removeLayer(layerRef.current); 
            }
        };

    }, [map])

    return null
}

export default TileLayers