import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useState } from 'react'

const GoogleMapComponent = (props) => {
    const containerStyle = {
        width: '400px',
        height: '400px'
    }

    const center = {
        lat: props.lat,
        lng: props.lon
    }

    const marker = {
        position: {
            lat: props.lat,
            lng: props.lon
        },
        draggable: false
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })


    return(
        isLoaded ? (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
            >
                <Marker
                    position={marker.position}
                    draggable={marker.draggable}
                >
                </Marker>
            </GoogleMap>
        </>
        ) : <></>
        
    )
}

export default GoogleMapComponent