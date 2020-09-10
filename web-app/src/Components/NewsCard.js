import React from 'react'

const NewsCard = props => {
    return(
        <div onClick={()=>props.cardClicked()} style={{padding:'10px',backgroundColor:'#1f1f1f',display:'inline-block',margin:'15px',width:'240px',cursor:'pointer',verticalAlign:'top'}}>
            <img src={props.img} style={{width:'100%',height:'130px'}}/>
            <p style={{color:'white',fontWeight:'900',fontSize:'15px'}}>{props.title}</p>
            <p style={{color:'gray',fontSize:'10px'}}>{props.desc}</p>
        </div>
    )
}
export default NewsCard;