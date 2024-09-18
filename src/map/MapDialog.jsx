import React, { useEffect, useState } from 'react'
import CreateMap from './CreateMap'
import AddFeatureLayer from './layers/AddFeatureLayer';
import TaskLayer from './layers/TaskLayer';
import { toLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { circleStyle } from './style/mapStyle';

const MapDialog = ({ editedTask, setValue }) => {

    const [editedTaskState, setEditedTaskState] = useState(editedTask);
    const [newFeatures, setNewFeatures] = useState([]);

    const handleMapClick = (event) => {
        const coordinate = event.coordinate;
        const lonLat = toLonLat(coordinate);

        setValue('location', lonLat, { shouldValidate: true });

        if (editedTask) {
            editedTask.location = lonLat;
            setEditedTaskState(convertLocationToGeoJson(editedTask));
        }
        else {
            const newCircleFeature = addNewCircle(coordinate);
            setNewFeatures([newCircleFeature]);
        }
    }

    const addNewCircle = (coordinate) => {
        const circleFeature = new Feature({
            geometry: new Point(coordinate),
        });

        circleFeature.setStyle(circleStyle());

        return circleFeature;
    }


    const convertLocationToGeoJson = (task) => {
        if (task && task.location) {
            if (task.location.type === 'Point' && Array.isArray(task.location.coordinates) && task.location.coordinates.length === 2) {
                return task;
            }
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
            setEditedTaskState(convertLocationToGeoJson(editedTask));
        }
    }, [editedTask]);

    return (
        <div className='mapDialogContainer'>
            <CreateMap onMapClick={handleMapClick}>
                <TaskLayer array={[editedTaskState]} />
                <AddFeatureLayer features={newFeatures} />
            </CreateMap>
        </div>

    )
}

export default MapDialog