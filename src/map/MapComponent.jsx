import React, { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat, toLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import 'ol/ol.css';
import useFilterTodos from '../hooks/useFilterTodos';

const MapComponent = ({ onMapClick }) => {
    const mapRef = useRef(); 
    const { filterTasks, isFetching } = useFilterTodos();

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

            const handleMapClick = (event) => {
                const coordinate = event.coordinate;
                const lonLat = toLonLat(coordinate);
                if (onMapClick) {
                    onMapClick(lonLat);
                }
            };

            map.on('click', handleMapClick);

            return () => {
                map.setTarget(undefined); 
                map.un('click', handleMapClick); 
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
