import GeoJSON from 'ol/format/GeoJSON';

export const updateFeatures = (vectorSource, filterTasks, editedTask) => {
    const geoJSONFormat = new GeoJSON();

    if (editedTask === 'currentTasks') {
        const features = filterTasks.flatMap(task =>
            task.location ? geoJSONFormat.readFeatures(task.location, { featureProjection: 'EPSG:3857' }) : []
        );
        vectorSource.clear();
        vectorSource.addFeatures(features);
    } else if (editedTask) {
        const feature = geoJSONFormat.readFeatures(editedTask.location, { featureProjection: 'EPSG:3857' });
        vectorSource.addFeatures(feature);
    }
};

export const convertToFeatures = (array) => {
    const geoJSONFormat = new GeoJSON();
    const features = array.flatMap(task =>
        task.location ? geoJSONFormat.readFeatures(task.location, { featureProjection: 'EPSG:3857' }) : []
    );
    return features
}
