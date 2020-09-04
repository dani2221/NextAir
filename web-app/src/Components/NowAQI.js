import React from 'react';
import CountUp from 'react-countup'
import './NowAQI.css'
const NowAQI = props =>{
    return(
        <div style={{margin:'0 auto',color:'white'}}>
            <select style={{margin:'30px 0 0 0'}} name="cars" id="cars" onChange={val=>props.stationChange(val.target.value)}>
                {props.stations.map((el,index)=>{
                    return(<option value={index}>{el.m}</option>)
                })}
            </select>
            <div style={{margin:'30px 0 0 0'}}>
                {typeof props.AQI == "string" ? <p className='countup aqi'>{props.AQI}</p>:<CountUp end={props.AQI} duration={3} className='countup aqi'/>}
                <p style={{margin:'0'}} className='mesurementLabels'>AQI</p>
            </div>
            <div>
                <div style={{display:'inline-block',margin:'20px'}}>
                    {typeof props.pm10 == "string" ? <p className='countup'>{props.pm10}</p>:                    <CountUp decimals={1} end={props.pm10} duration={4} className='countup'/>}
                    <p className='mesurementLabels'>pm10</p>
                </div>
                <div style={{display:'inline-block',margin:'20px'}}>
                    {typeof props.pm25 == "string" ? <p className='countup'>{props.pm25}</p>:<CountUp decimals={1} end={props.pm25} duration={4} className='countup'/>}
                    <p className='mesurementLabels'>pm2.5</p>
                </div>
                <div style={{display:'inline-block',margin:'20px'}}>
                    {typeof props.no2 == "string" ? <p className='countup'>{props.no2}</p>:<CountUp decimals={1} end={props.no2} duration={4} className='countup'/>}
                    <p className='mesurementLabels'>NO2</p>
                </div>
                <div style={{display:'inline-block',margin:'20px'}}>
                    {typeof props.o3 == "string" ? <p className='countup'>{props.o3}</p>:<CountUp decimals={1} end={props.o3} duration={4} className='countup'/>}
                    <p className='mesurementLabels'>O3</p>
                </div>
            </div>

        </div>
    )
}
export default NowAQI;