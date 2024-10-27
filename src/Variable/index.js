import * as L from 'leaflet';


export function icon(name){
    const ICON = L.icon({
        iconUrl: 'https://mappinghistorybucket.s3.us-east-2.amazonaws.com/MappingHistoryMarker/'+name,
        iconSize: [60, 60],
        radius:50
    })
    return ICON;
}

export function iconRandom(name){
    const ICON = L.icon({
        //iconUrl: 'https://source.unsplash.com/50x50/?'+name,
        iconUrl:name,
        //iconUrl:"icon.png",
        radius: 50,
        className: 'my-div-icon',
        iconSize: [70, 70],
    })
    return ICON;
}


export const ICONRED = L.icon({
    iconUrl: "icon-red.png",
    iconSize: [40, 40],
})

export const ICONBLUE = L.icon({
    iconUrl: "icon.png",
    iconSize: [40, 40],
})


export var theRadius= 1000
export var serverLink = "https://mappinghistoryai-server.onrender.com/"
//export var serverLink="http://localhost:5001/"
