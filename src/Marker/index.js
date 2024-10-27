import React , { useEffect, useState } from 'react';
import {Marker,Popup} from 'react-leaflet'
import { icon } from '../Variable';
import MarkerInf from '../MarkerInf';
import AddPolygon from '../GeoJson/addPolygon';
import { ICONRED,theRadius,ICONBLUE ,iconRandom} from '../Variable';


export default function CustomMarker(props){
  const [renderedThings, setRenderThings] = useState();
  const [itemsRendered , setItemsRendered] = useState(0);
  const [show, setShow] = useState(false);
  const [year,setYear] = useState();

  useEffect(() => {
    setRenderThings(props.things);
    setYear(((props.things.date).split("/"))[2])    
    setShow(true);
  },[props]);

  if(show){
    return(
      <>
      <Marker key={renderedThings.event} icon={iconRandom(props.image_url)} position={[renderedThings.latitude,renderedThings.longitude]}>
        <Popup>
        <span className='description-name' >{renderedThings.event}</span><br></br>
          {renderedThings.description}<br></br>
          <span className='description-date'>Date:</span>{renderedThings.date}
        </Popup>
      </Marker>
      <MarkerInf markerName={renderedThings.event} desc= {renderedThings.description} date ={renderedThings.date}></MarkerInf>
      <AddPolygon yearMarker = {year}></AddPolygon>
      </>
  )
  }
}