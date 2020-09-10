import React from 'react'
import {ResponsiveContainer, LabelList, AreaChart,Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const PredictionChart = props =>{
    return(
        <div style={{backgroundColor:'rgba(0,0,0,0)',margin:'0,auto',width:'100%',height:'300px'}}>
            <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={props.chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="AQI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="labell" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="red" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="green" stopOpacity={0.8}/>
                </linearGradient>
            </defs>
            <LabelList dataKey="pm2.5/pm10" position="top" />
            <XAxis dataKey="name" tick={{ fill: 'white' }} />
            <YAxis tick={{ fill: 'white' }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="pm2.5/pm10" stroke="#8884d8" fillOpacity={1} fill="url(#AQI)" />
            </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PredictionChart;