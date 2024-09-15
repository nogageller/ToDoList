// components/MapClickHandler.js
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { toLonLat } from 'ol/proj';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import React, { useEffect } from 'react';

const MapClickHandler = ({ map, vectorSource, onMapClick }) => {
    useEffect(() => {
        if (!map || !onMapClick) return;

        const handleClick = (event) => {
            // Define the logic for handling clicks, including updating features
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

            vectorSource.clear();
            vectorSource.addFeature(circleFeature);

            if (onMapClick) {
                onMapClick(lonLat);
            }
        };

        // Attach the click event listener
        map.on('click', handleClick);

        // Cleanup the event listener on unmount or when dependencies change
        return () => {
            map.un('click', handleClick);
        };
    }, [map, vectorSource, onMapClick]);

    return null;
};

export default MapClickHandler;
