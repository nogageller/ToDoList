import React from 'react'
import TileLayers from './TileLayers'

const BaseLayers = ({ children }) => {
    return (
        <>
            <TileLayers />
            {children}
        </>
    )
}

export default BaseLayers