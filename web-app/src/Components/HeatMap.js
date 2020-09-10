import React, { useEffect, Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { MAPBOX_KEY, AQI_KEY } from '../ENVIRONMENT'
import './HeatMap.css'
import Axios from 'axios'
import turf from '@turf/turf'

class HeatMap extends Component{
    componentDidMount(){
        mapboxgl.accessToken =  MAPBOX_KEY;
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [21.763,41.591],
            zoom: 7.5
            });
            map.on('load', () => {
                Axios.get('https://api.waqi.info/map/bounds/?latlng=41.03143,20.52421,42.20194,22.89056&token='+AQI_KEY).then(res=>{
                    const data = [];
                    res.data.data.map(station=>{
                        if(station.aqi!=='-'){
                            data.push(JSON.stringify({ "type": "Feature", "properties": {"aqi": parseInt(station.aqi)},
                            "geometry":
                            {
                                "type": "Point", "coordinates": [ station.lon, station.lat ]
                            }
                            }))
                        }
                    })
                    
                    console.log(data)



                    map.addSource('AQI', {
                        'type': 'geojson',
                        'data':
                        {
                            "type": "FeatureCollection",
                            "crs": { "type": "name", "properties": { "aqi": "aqi" } },
                            "features": data.map(JSON.parse)
                        }
                        });
                        map.addLayer(
                            {
                            'id': 'AQI-heat',
                            'type': 'circle',
                            'source': 'AQI',
                            'paint': {
                                'circle-radius': [
                                    'interpolate',
                                    ['exponential',1],
                                    ['zoom'],
                                    6,50,
                                    20,500
                                ],
                                'circle-opacity': {
                                    'type': 'exponential',
                                    'stops': [[-99, 0.0], [-50, 0.5]]
                                },
                                'circle-color': [
                                    'interpolate',
                                    ['linear'],
                                    ['get', 'aqi'],
                                    0,        
                                    '#eee695',
                                    50,
                                    '#a5fc03',
                                    100,     
                                    '#dbfc03',
                                    200,
                                    '#fc1c03'  
                                ],
                                'circle-blur': 1,
                                "circle-stroke-opacity": 0.2
                
                            }
                            }
                        );
                })
        })
    }
    render(){
        return(<div style={{margin:'20px auto'}}>
            <div ref={el => this.mapContainer = el} className='mapContainer'/>
        </div>)
    }
}

export default HeatMap;