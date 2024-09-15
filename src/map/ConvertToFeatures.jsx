import React from 'react'
import AddFeatureLayer from './layers/AddFeatureLayer';
import GeoJSON from 'ol/format/GeoJSON';

const ConvertToFeatures = ({ array, isFetching }) => {

  const convertToFeatures = (array) => {
    if (array[0]) {
      const geoJSONFormat = new GeoJSON();
      const geoFeatures = array.flatMap(task =>
        task.location ? geoJSONFormat.readFeatures(task.location, { featureProjection: 'EPSG:3857' }) : []
      );
      return geoFeatures
    }
    return;
  }

  const updateFeatures = !isFetching ? convertToFeatures(array) : [];

  return (
    <div>
      <AddFeatureLayer features={updateFeatures}></AddFeatureLayer>
    </div>
  )
}

export default ConvertToFeatures