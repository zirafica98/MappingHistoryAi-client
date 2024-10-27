import './Map.css';
import { MapContainer, TileLayer} from 'react-leaflet'
import "leaflet/dist/images/marker-shadow.png";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import React from 'react';
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { Data } from '../Data';
import MarkerRadius from '../MarkerRadius';
export class MyMap extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        lan: props.lan,
        lon:props.lon,
        cityName:props.cityName,
        items:[],
        question:props.question,
        kilometers:100
      }
  }
  changeKilometers (event){
    const slideValue = document.getElementsByClassName("kilometersValue");
    const inputSlider = document.getElementsByClassName("inputValue");
    inputSlider.oninput = (()=>{
      let value = inputSlider.value;
      slideValue.textContent = value;
      slideValue.style.left = (value/2) + "%";
      slideValue.classList.add("show");

    });
    inputSlider.onblur = (()=>{
      slideValue.classList.remove("show");
    });

    
  };

  componentDidMount(){
    localStorage.setItem('range', this.state.kilometers);
    fetch("https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + this.state.cityName)
    .then(res => res.json())
    .then(
      (result) => {
       
        this.setState({
          isLoaded: true,
          items: result
        });

    },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    
      if (this.state.items.length>0){
        return (
          <div>
          <MapContainer center={[this.state.items[0].lat,this.state.items[0].lon]} zoom={14} style={{height: "100vh"}}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://api.maptiler.com/maps/voyager/256/{z}/{x}/{y}.png?key=tbxxnHOYRKXeGzScTE2D" />
              {/* <Marker icon={ICONRED} position={[this.state.items[0].lat,this.state.items[0].lon]}></Marker> */}
            <Data items={this.state.items} city={this.state.cityName} radius={this.state.kilometers} question={this.state.question} ></Data>
            <MarkerRadius center={[this.state.items[0].lat,this.state.items[0].lon]} radius= {this.state.kilometers}></MarkerRadius>
            </MapContainer>
            <div className="range-operations">
                <div className="range">
                <div className="sliderValue">
                  <span className='kilometersValue'>{this.state.kilometers}</span>
                </div>
                <div className="field">
                  <div className="value left">100</div>
                  <input type="range" orientation="vertical" className='inputValue' onChange={(event) => {this.setState({ kilometers: event.target.value}); this.changeKilometers();localStorage.setItem('range', event.currentTarget.value);}} min="0" max="20000" value={this.state.kilometers} steps="1"/>
                  <div className="value right">20000</div>
                </div>
              </div>
            </div>
          </div>
        )
      }else{
        return "";
      }
      
    
  }
}
