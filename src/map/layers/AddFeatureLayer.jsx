import { useEffect, useRef } from 'react';
import { Vector as VectorLayer } from 'ol/layer';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { useMap } from '../../hooks/useMap';
import { createFeatureStyle } from '../style/mapStyle';

const AddFeatureLayer = ({ features }) => {

    const { map } = useMap()
    const vectorSource = useRef(new VectorSource({ features: [] }));

    useEffect(() => {
        if (!map) return;

        const vectorLayer = new VectorLayer({
            source: vectorSource.current,
            style: createFeatureStyle(),
        });

        map.addLayer(vectorLayer);

        if (features) {
            vectorSource.current.clear();
            vectorSource.current.addFeatures(features);
        }

        return () => {
            if (vectorLayer.current) {
                map.removeLayer(vectorLayer.current);
            }
        };

    }, [map, features]);

    return null;
};

export default AddFeatureLayer;
