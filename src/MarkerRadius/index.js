import {Circle} from "react-leaflet";

import React from 'react';


function MarkerRadius(props) {
    return (
        <div>
            <Circle center={[props.center[0],props.center[1]]} radius={props.radius} />
        </div>
    );
}

export default MarkerRadius;