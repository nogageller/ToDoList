import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';

export const createFeatureStyle = () => new Style({
    image: new CircleStyle({
        radius: 7,
        fill: new Fill({ color: 'pink' }),
        stroke: new Stroke({ color: 'black', width: 1.5 }),
    }),
});

export const circleStyle = () => new Style({
    image: new CircleStyle({
        radius: 10,
        fill: new Fill({ color: 'black' }),
        stroke: new Stroke({ color: 'pink', width: 2 }),
    }),
});