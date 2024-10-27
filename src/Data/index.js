import React from 'react';
import StartFirebase from '../firebaseConfig/firebase';
import CustomMarker from '../Marker';
import {ref,onValue} from 'firebase/database'
import CustomMarkerMainCity from '../Marker/CustomMarkerMainCity';
import Loader from '../Loader/Loader';
import { serverLink } from '../Variable';
import imagesByCategories from './category_img';
const db = StartFirebase();
export class Data extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          loading: false,
          items: this.props.items,
          data:null,
          radius:this.props.radius,
          counter:0,
          setArray:null,
          city:this.props.city,
          question:this.props.question,
          mainCity:false,
          event:"",
          imagesByCategories,
          image_url:null,
          stringImageCategories:""
        }
      }

      async componentDidMount(){
        var city = (this.state.city).toLowerCase()
        if(city === "london" || city === "paris" || city === "new york" || city === "berlin" ||  city === "roma"){
          this.setState({
            mainCity:true
          })
          this.callMyData();
        
        }else{
          const timer = ms => new Promise(res => setTimeout(res, ms))
          for(var i = 0 ; i <= 10 ; i++){
            if(i===0){
              this.callDataAI(true);
              await timer(15000);
            }else{
              this.callDataAI();
              await timer(15000);
            }
          }
        }
      }
    
    

    async callDataAI(firstTime) {
      let prompt;
      this.setState({ loading: true, imagesByCategories:imagesByCategories });

      var stringCategoryForImage= Object.keys(imagesByCategories).join(', ');
      this.setState({stringImageCategories:stringCategoryForImage});

      var string = JSON.stringify(this.state.imagesByCategories);

      //console.log(stringCategoryForImage);
      if (this.state.question) {
          prompt = this.state.question + ' Format for answer JSON{"event":"???","description":"???","date":"mm/dd/yyyy","type":"","longitude":"???","latitude":"???","imgCategory":"???"}. Event should be location related ' + this.state.city + '. Return everything in json format in one line. Return events depending on the following categories: '+stringCategoryForImage+ ' and set the name of the category you chose in the imgCategory column.The category name must be exactly as given in the categories. Do not use slashes when returning an answer';
          
          if (!firstTime) {
              prompt += ' Event not to be: ' + this.state.event + '.';
          }
      } else {
          prompt = 'Give me interesting historical event for ' + this.state.city + ' in the following form {"event":"???","description":"???","date":"mm/dd/yyyy","type":"","longitude":"???","latitude":"???","imgCategory":"???"}. It is mandatory to put quotation marks on the keys in json. Send longitude and latitude as numbers without additional tags. Return everything in json format in one line. Return events depending on the following categories: '+stringCategoryForImage+ ' and set the name of the category you chose in the imgCategory column. The category name must be exactly as given in the categories. Do not use slashes when returning an answer';
          
          if (!firstTime) {
              prompt = 'Give me a unique historical event for '+this.state.city+', excluding the following events: '+this.state.event+'. Return the information in the following format: {"event":"???","description":"???","date":"mm/dd/yyyy","type":"","longitude":???, "latitude":???,"imgCategory":"????"}.Return everything in json format in one line. Return events depending on the following categories: '+stringCategoryForImage+' and set the name of the category you chose in the imgCategory column. The category name must be exactly as given in the categories.Do not use slashes when returning an answer';
          }
        }
  
      const response = await fetch(serverLink + "openAi", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt })
      });
  
      if (!response.ok) {
          alert("Error fetching historical events");
          return;
      }
  
      const data = await response.json();
      const parsedData = data.response.trim();
  
      // const imageResponse = await fetch(serverLink + "createImages", {
      //     method: "POST",
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //         prompt: "Generate an image of " + JSON.parse(parsedData).event + " with key figures and elements."
      //     })
      // });
  
      // if (!imageResponse.ok) {
      //     alert("Error generating image");
      //     return;
      // }
  
      // const imageData = await imageResponse.json();
      // const imageUrl = imageData.bot;

      var imageType = JSON.parse(parsedData).imgCategory;
      var urlImage = "https://mappinghistorybucket.s3.us-east-2.amazonaws.com/MappingHistoryMarker/"+this.state.imagesByCategories[imageType][0];

  
      this.setState(prevState => ({
          data: JSON.parse(parsedData),
          event: firstTime ? JSON.parse(parsedData).event : prevState.event + "," + JSON.parse(parsedData).event,
          image_url: urlImage,
          loading: false
        
      }));
  }
  



    async callMyData(){
      const dbRef = ref(db,'/2/data');
        onValue(dbRef,(snapshot)=>{
            var records=[]
            snapshot.forEach(childSnapshot=>{
                let keyName=childSnapshot.key;
                let data=childSnapshot.val();
                if(this.getDistance([data.long_marker,data.lat],[this.state.items[0].lon,this.state.items[0].lat])<=this.state.radius && records.length<5){
                    records.push({"key":keyName,"data":data})
                }
            })

            records.forEach((element) => {
                if(element.data.bc_ad==="BC"){
                    element.data.complateYear = element.data.year * (-1)
                }else{
                    element.data.complateYear = element.data.year 
                }
            })

            records.sort(function(a,b){
                return parseFloat(a.data.complateYear) - parseFloat(b.data.complateYear);
            })

            this.setState({
                data: records
            });
          })
    }
  


    getDistance(origin, destination) {
        var lon1 = this.toRadian(origin[1]),
            lat1 = this.toRadian(origin[0]),
            lon2 = this.toRadian(destination[1]),
            lat2 = this.toRadian(destination[0]);
    
        var deltaLat = lat2 - lat1;
        var deltaLon = lon2 - lon1;
    
        var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
        var c = 2 * Math.asin(Math.sqrt(a));
        var EARTH_RADIUS = 6371;
        return c * EARTH_RADIUS * 1000;
    }
    
    toRadian(degree){
        return degree*Math.PI/180
    }
    sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }

    render() {
      //const { loading, data } = this.state;
        
        if (this.state.data == null) {
            return <Loader></Loader>;
        }else{
          if(this.state.mainCity) {
            return (
              <CustomMarkerMainCity things={this.state.data} image_url={this.state.image_url}></CustomMarkerMainCity>
            );
          }else{
            return (
              <CustomMarker things={this.state.data} image_url={this.state.image_url}></CustomMarker>
            );
          }
            
        }
    }
}
