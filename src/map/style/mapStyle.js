import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';

export const createFeatureStyle = () => new Style({
    image: new CircleStyle({
        radius: 7,
        fill: new Fill({ color: 'pink' }),
        stroke: new Stroke({ color: 'black', width: 1.5 }),
    }),
});
