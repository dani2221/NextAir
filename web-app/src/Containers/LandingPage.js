import React from 'react'
import Prediction from './Prediction'
import HeatMap from '../Components/HeatMap'

const LandingPage = ()=>{
    return(
    <div style={{paddingLeft:'3%', paddingRight:'3%'}}>
        <Prediction/>
        <HeatMap/>
    </div>)
}
export default LandingPage;