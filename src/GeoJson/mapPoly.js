import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
export default function MapPoly(props){
    const [dataJson,setDataJson] = useState();
    const [isSet,setIsSet] = useState(false);
    const [numberTime,setNumberTime] = useState('');
    function style(features) {
        return {
         
          fillColor: features.properties.fill,
          color: "#000",
          weight:0.5,
          dashArray: '0',
          opacity: 0.4,
          fillOpacity: 0.4
        };
    }

    

      useEffect(()=>{
        const fetchData = (()=>{
            let data = import('./json/world_'+props.finalNumber+'.json');
            data.then(d=>{
                setDataJson(d.features);
                setIsSet(true);
                setNumberTime(numberTime+1);
            })
        })
        fetchData();
        
      },[props.finalNumber])
        return(
            <>
            {isSet && <GeoJSON key={numberTime} data={dataJson} style ={style}/>}
            </>
        )
}
