import React, { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import 'ol/ol.css';
import useFilterTodos from '../hooks/useFilterTodos';

const MapComponent = () => {
    const mapRef = useRef(); 
    const { filterTasks, isFetching, error } = useFilterTodos();


    useEffect(() => {
        if (mapRef.current && !isFetching) {
            const map = new Map({
                target: mapRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: fromLonLat([0, 0]),
                    zoom: 2,
                }),
            });

            const vectorSource = new VectorSource({
                features: [],
            });

            const vectorLayer = new VectorLayer({
                source: vectorSource,
                style: new Style({
                    image: new CircleStyle({
                        radius: 10, 
                        fill: new Fill({ color: 'pink' }), 
                        stroke: new Stroke({ color: 'black', width: 2 }),
                    }),
                }),
            });

            map.addLayer(vectorLayer);

            const geoJSONFormat = new GeoJSON();
            const features = filterTasks.flatMap(task =>
                task.location ? geoJSONFormat.readFeatures(task.location, { featureProjection: 'EPSG:3857' }) : []
            );
            vectorSource.addFeatures(features);

            return () => map.setTarget(undefined); 
        }

    }, [filterTasks, isFetching]);

    return (
        <div
            ref={mapRef} 
            style={{ width: '100%', height: '400px' }} 
        />
    );
};

export default MapComponent;
