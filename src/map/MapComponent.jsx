import React, { useEffect, useRef } from 'react';
import { Feature, Map, View } from 'ol';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat, toLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import 'ol/ol.css';
import useFilterTodos from '../hooks/useFilterTodos';
import { Point } from 'ol/geom';

const MapComponent = ({ onMapClick, editedTask }) => {
    const mapRef = useRef();
    const vectorSource = useRef(new VectorSource({ features: [] }));
    const mapRefInstance = useRef();
    const { filterTasks, isFetching } = useFilterTodos();


    useEffect(() => {
        if (!mapRef.current || isFetching) return;
        if (!mapRefInstance.current) {
            const map = new Map({
                target: mapRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                    new VectorLayer({
                        source: vectorSource.current,
                        style: new Style({
                            image: new CircleStyle({
                                radius: 7,
                                fill: new Fill({ color: 'pink' }),
                                stroke: new Stroke({ color: 'black', width: 1.5 }),
                            }),
                        }),
                    }),
                ],
                view: new View({
                    center: fromLonLat([0, 0]),
                    zoom: 2,
                }),
            });

            mapRefInstance.current = map;
        }

        if(editedTask == 'currentTasks'){
            const geoJSONFormat = new GeoJSON();
            const features = filterTasks.flatMap(task =>
                task.location ? geoJSONFormat.readFeatures(task.location, { featureProjection: 'EPSG:3857' }) : []
            );
            vectorSource.current.clear();
            vectorSource.current.addFeatures(features);
        }
        else if (editedTask) {
            const geoJSONFormat = new GeoJSON(); 
            const feature = geoJSONFormat.readFeatures(editedTask.location, { featureProjection: 'EPSG:3857' })
            vectorSource.current.addFeatures(feature)
        }

        const handleMapClick = (event) => {
            const coordinate = event.coordinate;
            const lonLat = toLonLat(coordinate);

            const circleFeature = new Feature({
                geometry: new Point(coordinate),
            });

            circleFeature.setStyle(new Style({
                image: new CircleStyle({
                    radius: 10,
                    fill: new Fill({ color: 'black' }),
                    stroke: new Stroke({ color: 'pink', width: 2 }),
                }),
            }));

            vectorSource.current.clear();
            vectorSource.current.addFeature(circleFeature);

            if (onMapClick) {
                onMapClick(lonLat);
            }
        };

        if (editedTask != 'currentTasks'){
            mapRefInstance.current.on('click', handleMapClick);
        }

        return () => {
            if (mapRefInstance.current) {
                mapRefInstance.current.un('click', handleMapClick);
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
