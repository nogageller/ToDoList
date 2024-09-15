import React, { useEffect, useState } from 'react'
import CreateMap from './CreateMap'
import TaskLayer from './layers/AddFeatureLayer';
import AddFeatureLayer from './layers/AddFeatureLayer';
import ConvertToFeatures from './ConvertToFeatures';
import { toLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { Point } from 'ol/geom';

const MapDialog = ({ editedTask, setValue }) => {

    const [editedTaskState, setEditedTaskState] = useState(editedTask);

    const handleMapClick = (event) => {
        const coordinate = event.coordinate;
        const lonLat = toLonLat(coordinate);
        setValue('location', lonLat, { shouldValidate: true });
        if (editedTask) {
            editedTask.location = lonLat;
            editedTask = convertLocationToGeoJson(editedTask)
            setEditedTaskState(editedTask)
        }
        else {
            const newCircleFeature = addNewCircle(coordinate);
            <AddFeatureLayer features={newCircleFeature} />
        }
    }

    const addNewCircle = (coordinate) => {
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
    }


    const convertLocationToGeoJson = (task) => {
        if (task && task.location) {
            return {
                ...task,
                location: {
                    type: 'Point',
                    coordinates: task.location
                }
            };
        }
        return null;
    };

    useEffect(() => {
        if (editedTask && editedTask.location) {
            <ConvertToFeatures array={[editedTaskState]} />
        }
    }, [editedTask]);

    return (
        <div className='mapDialogContainer'>
            <CreateMap onMapClick={handleMapClick}>
                <ConvertToFeatures array={[editedTaskState]} />
            </CreateMap>
        </div>

    )
}

export default MapDialog