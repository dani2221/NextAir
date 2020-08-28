import React from 'react'

const PredictionChart = props =>{
    return(
        <div>
            {props.predictions.map(el=>{
                return(<div key={el.date}>
                    <p>el.value</p>
                </div>)
            })}
        </div>
    )
}

export default PredictionChart;