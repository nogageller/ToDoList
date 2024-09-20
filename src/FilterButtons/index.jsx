import React from 'react'
import HideDoneBtn from './HideDoneBtn';
import DeleteDoneBtn from './DeleteDoneBtn';
import ShowDoneBtn from './ShowDoneBtn';
import ShowAllBtn from './ShowAllBtn';

const FilterButtons = () => {

    return (
        <div className='filterButtonsDiv'>
            <HideDoneBtn />
            <DeleteDoneBtn />
            <ShowDoneBtn />
            <ShowAllBtn />
        </div>
    )
}

export default FilterButtons