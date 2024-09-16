import React from 'react'
import AddFeatureLayer from './layers/AddFeatureLayer';
import GeoJSON from 'ol/format/GeoJSON';

const ConvertToFeatures = ({ array, isFetching }) => {

  const convertToFeatures = (array) => {
    if (!array || !Array.isArray(array)) {
      console.error('Invalid input: Expected an array.');
      return [];
    }

    const geoJSONFormat = new GeoJSON();

    return array.flatMap(task => {
      if (task && task.location) {
        try {
          const geoJsonLocation = {
            type: 'Feature',
            geometry: task.location,
          };

          return geoJSONFormat.readFeatures(geoJsonLocation, { featureProjection: 'EPSG:3857' });
        } catch (error) {
          console.error('Error reading GeoJSON feature:', error);
          return [];
        }
      }
      return [];
    });
  };

  const updateFeatures = !isFetching ? convertToFeatures(array) : [];

  return (
    <div>
      <AddFeatureLayer features={updateFeatures}></AddFeatureLayer>
    </div>
  )
}

export default ConvertToFeatures