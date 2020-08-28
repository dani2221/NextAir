import React,{Component} from 'react'
import PredictionChart from '../Components/PredictionChart'
import * as tf from '@tensorflow/tfjs'
import axios from 'axios'
import {WEATHER_KEY, AQI_KEY, MODEL_URL} from '../ENVIRONMENT'

export default class Prediction extends Component{
    constructor(props){
        super(props);
        const model = React.createRef()
    }

    componentDidMount(){
        this.loadModel()
    }
    state = {
        modelLoad: false,
        predictions:[],
        selectedWeatherCity: 'bitola',
        selectedAQIcity:'bitola'
    }

    loadModel = () =>{
        tf.loadGraphModel(MODEL_URL).then(result=>{
            this.model = result;
            this.setState({modelLoad: true});
            this.getWeatherData().then(wd=>{
                this.getPredictions(wd)
            })
        })
    }
    predict = data => {
        //normalize data
        const normalized = {...data};
        // norm = (x-mean)/std
        normalized.rain = (data.rain-0.053075)/0.174752;
        normalized.temp = (data.temp-56.742694)/16.128402;
        normalized.wind = (data.wind-4.643075)/1.698558;
        normalized.day = (data.day-76.626519)/45.207047;
        normalized.year = (data.year-83.628948)/51.577680;


        const inputTensor = tf.tensor2d([normalized.rain,normalized.temp,normalized.wind,normalized.day,normalized.year],[1,5])
        const prediction =  this.model.predict(inputTensor).dataSync()
        return prediction[0]
        
    }
    getNextDates = weatherType=>{
        const checkDates = [];
        for(let i=1;i<6;i++){
            let result = new Date();
            result.setDate(result.getDate() + i);

            let dd = String(result.getDate()).padStart(2, '0');
            let mm = String(result.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = result.getFullYear();
            let finalDate;
            if(weatherType){
                finalDate = yyyy + '-' + mm + '-' + dd + ' 18:00:00';
                if(i===5){
                    finalDate = yyyy + '-' + mm + '-' + dd + ' 06:00:00';
                }
            }else{
                finalDate = mm + ':' + dd + ':' + yyyy;
            }
            checkDates.push(finalDate)
        }
        return checkDates
    }
    getWeatherData = async ()=>{
        const checkDates = this.getNextDates(true)
        return new Promise((resolve,reject)=>{
            axios.get('http://api.openweathermap.org/data/2.5/forecast?q='+this.state.selectedWeatherCity+'&units=imperial&appid='+WEATHER_KEY).then(res=>{
                const data = []
                res.data.list.map(el=>{
                    checkDates.map(date=>{
                        if(el.dt_txt===date){
                            let temp;
                            let wind;
                            let rain;;
                            try{
                                temp= el.main.temp;
                            }catch(err){
                                temp = 80;
                            }
                            try{
                                wind= el.wind.speed;
                            }catch(err){
                                wind=0;
                            }
                            try{
                                rain= el.rain['3h']
                            }catch(err){
                                rain=0
                            }
                            //convert from mm to 0.1 inches
                            rain = (rain/254)*4
                            //convert mph wind to knots
                            wind = wind/1.15078
                            const obj = {
                                temp: temp,
                                wind: wind,
                                rain: rain
                            }
                            data.push(obj)
                        }
                    })
                })
                resolve(data);
            }).catch(err=>{
                reject(err)
            })
        })
    }
    getPredictions = async weatherData=>{
        const dates = this.getNextDates(false)
        const predictions = [];

        //get AQI for today
        axios.get('https://api.waqi.info/feed/'+this.state.selectedAQIcity+'/?token='+AQI_KEY).then(async res=>{
            let aqi;
            if(res.data.data.iaqi.pm25){
                aqi=res.data.data.iaqi.pm25.v;
            }else if(res.data.data.iaqi.pm10){
                aqi=res.data.data.iaqi.pm10.v;
            }else if(res.data.data.aqi){
                aqi=res.data.data.aqi;
            }else{
                aqi=-1;
            }
            //use the model to get aqis for the next 5 days
            for(let i=0;i<dates.length;i++){
                let date = dates[i];
                const indDates = date.split(':');
                indDates[2] = indDates[2]-1;
                date = indDates[0]+':'+indDates[1]+':'+indDates[2];
                //get value for last year
                let lastyr;
                const splitup = date.split(':');
                let newStr = ''
                splitup.map((el,index)=>{
                    if(index!==2){
                        if(el.length===2 && el<10){
                            newStr += (el.charAt(1)+':')
                        }else{
                            newStr += (el+':')
                        }
                    }
                });
                newStr+=(splitup[2]);
                lastyr = await axios.get('https://next-air.firebaseio.com/stations/'+this.state.selectedWeatherCity+'/'+newStr+'.json');
                if(lastyr.data == ' ' ){
                    lastyr=aqi;
                }else{
                    lastyr=lastyr.data;
                }
                aqi = this.predict({...weatherData[i],day:aqi,year:lastyr})
                predictions.push(aqi);
            }
            console.log(predictions)
        })
    }



    render(){
        return(
            <div>
                <p/>
            </div>
        )
    }
}