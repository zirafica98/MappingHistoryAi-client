import React from 'react';


export default function MarkerInf(props){


    return(
        <div className='marker-inf'>
            <span className='markerName'>{props.markerName}</span>
            <span className='date'>{props.date} {props.bc_ad}</span>
            <p>{props.desc}</p>
        </div>
    )

    

} 