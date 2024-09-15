import { useEffect, useRef } from 'react';
import { Vector as VectorLayer } from 'ol/layer';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { useMap } from '../../hooks/useMap';

const AddFeatureLayer = ({ features }) => {

    const { map } = useMap()
    const vectorSource = useRef(new VectorSource({ features: [] }));

    useEffect(() => {
        if (!map) return;

        if (map && vectorSource) {
            const vectorLayer = new VectorLayer({
                source: vectorSource.current,
                style: new Style({
                    image: new CircleStyle({
                        radius: 7,
                        fill: new Fill({ color: 'pink' }),
                        stroke: new Stroke({ color: 'black', width: 1.5 }),
                    }),
                }),
            });

            map.addLayer(vectorLayer);

            if(features){
                vectorSource.current.clear(); 
                vectorSource.current.addFeatures(features); 
            }

            return () => {
                if (vectorLayer.current) {
                    map.removeLayer(vectorLayer.current);
                }
            };

        }
    }, [map, features]);

    return null;
};

export default AddFeatureLayer;
