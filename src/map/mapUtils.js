import { Map, View } from 'ol';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

export const initializeMap = (mapContainer, vectorSource) => {
    return new Map({
        target: mapContainer,
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
            new VectorLayer({
                source: vectorSource,
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
};

export const handleMapClick = (event, vectorSource, onMapClick) => {
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