import { useEffect, useState } from "react";
import MapPoly from "./mapPoly";

export default function AddPolygon(props){
    const [finalNumber,setFinalNumber] = useState();
    const [yearForGeoJson]= useState([-1,-1000,-200,-2000,-323,-500,1000,117,1279,1492,1530,1650,1715,1783,1815,1830,1850,1861,1872,1880,1914,1920,1938,1939,1940,1941,1942,1943,1944,1945,1946,1994,2020,400,600,800])
    const [isSet,setIsSet] = useState(false);

    useEffect(() => {
        let arrayYearJson=[];
        let place;
        yearForGeoJson.forEach(function(array) {
            arrayYearJson.push(array);
        })
        arrayYearJson.push(props.yearMarker);
        arrayYearJson.sort(function(a, b){return a-b});
        arrayYearJson.forEach(function(array,index){
            if(arrayYearJson[index]==props.yearMarker){
                place=index;
            }
        })
        var finalnumber=arrayYearJson[place-1];

        setFinalNumber(finalnumber);
        setIsSet(true);
    
    });

    if(isSet){
        return(
            <>
                <MapPoly finalNumber={finalNumber} idPoly = {props.yearMarker}></MapPoly>
            </>
        )
    }
    

    
}


