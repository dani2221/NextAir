import React, { Component } from 'react'
import Axios from 'axios'
import NewsCard from '../Components/NewsCard'
import { withRouter } from 'react-router-dom'

class News extends Component{

    state={
        news: []
    }

    componentDidMount(){
        this.scrapeNews()
    }

    scrapeNews = () =>{
        const URL = 'https://thingproxy.freeboard.io/fetch/https://a1on.mk/feed/?s=zagaduvanje';
        Axios.get(URL)
        .then(response=>{
            if(response.status === 200) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data,"text/xml");
                const news = [];
                const titles = xmlDoc.getElementsByTagName('title');
                const links = xmlDoc.getElementsByTagName('link');
                const descriptions = xmlDoc.getElementsByTagName('description')
                for(let i=2;i<11;i++){
                    news.push({
                        title: titles[i+1].innerHTML,
                        link: links[i+1].innerHTML,
                        img: descriptions[i].innerHTML.split('src=\"')[1].split('\"')[0],
                        desc: descriptions[i].innerHTML.split('<p>')[1].split('</p>')[0].replace(/<[^>]*>?/gm, '').replace(/&[^;]*;?/gm, '')
                    })
                }

                console.log(news);
                this.setState({news:news.splice(0,3)})
            }
        }).catch(er=>console.log(er))
    }
    cardClicked = url=>{
        window.location.href=url;
    }

    render(){
        return(
            <div>
                 <div style={{padding:'10px',backgroundColor:'#1f1f1f',display:'inline-block',margin:'15px',width:'250px'}}>
                    <p style={{color:'white',fontSize:'15px'}}><b style={{color:this.props.stats.yd.color,fontSize:'80px',fontWeight:'100',marginBlock:'0'}}>{this.props.stats.yd.percent}</b>{this.props.stats.yd.text}</p>
                    <hr/>
                    <p style={{color:'white',fontSize:'15px'}}><b style={{color:this.props.stats.mnt.color,fontSize:'80px',fontWeight:'100',marginBlock:'0'}}>{this.props.stats.mnt.percent}</b>{this.props.stats.mnt.text}</p>
                </div>
                {this.state.news.map((el,index)=>{
                    return(<NewsCard key={el.link} {...el} cardClicked={()=>this.cardClicked(el.link)}/>)
                })
                }
            </div>
        )
    }
}

export default withRouter(News);