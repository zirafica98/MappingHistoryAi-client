
import { useMap} from 'react-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { ICON } from '../Marker';
import React,{useEffect} from 'react';
import { Data } from "../Data";

function LeafletgeoSearch() {
  const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        marker: {
          icon:ICON
        },
      });
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);
     return (<Data></Data>)
  }


  export default LeafletgeoSearch
