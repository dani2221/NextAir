const axios = require('axios');
const aqicnAPIkey = 'a616531163a60a4cd364b7f6bb867526800c140c'

//city constants
const lisice = '41.96359;21.501174';
const karposh = '42.005534;21.398311';
const centar = '41.995329;21.431383';
const rektorat = '42.003961;21.440711';
const gaziBaba = '42.003939;21.465625';
const lazaropole = '41.535355;20.695398';

const geoStations = [lisice,karposh,centar,rektorat,gaziBaba,lazaropole];

const bitola = 'bitola';
const gostivar = 'gostivar';
const kavadarci = 'kavadarci';
const kicevo = 'kicevo';
const kocani = 'kocani';
const kumanovo = 'kumanovo';
const miladinovci ='miladinovci'
const strumica = 'strumica';
const tetovo = 'tetovo';
const veles = 'veles';

const nameStations = [bitola,gostivar,kavadarci,kicevo,kocani,kumanovo,miladinovci,strumica,tetovo,veles];

//get aqicn API data
const promises = []
geoStations.map(el=>{
    promises.push(axios.get('https://api.waqi.info/feed/geo:'+el+'/?token='+aqicnAPIkey))
})
nameStations.map(el=>{
    promises.push(axios.get('https://api.waqi.info/feed/'+el+'/?token='+aqicnAPIkey))
})
const qualityResults = []
Promise.all(promises).then(res=>{
    res.map(el=>{
        console.log(el.data.data);
        try{
            let date = el.data.data.time.s.split(' ')[0]
            const rearange = date.split('-')
            date = rearange[1]+':'+rearange[2]+':'+rearange[0];
            if(!el.data.data.iaqi.pm25){
                if(!el.data.data.iaqi.pm10){
                    qualityResults.push({name:el.data.data.city.name,q: el.data.data.aqi,date: date})
                }else{
                    qualityResults.push({name:el.data.data.city.name,q: el.data.data.iaqi.pm10.v,date: date})
                }
            }else{
                qualityResults.push({name:el.data.data.city.name,q: el.data.data.iaqi.pm25.v,date: date})
            }
        }catch(err){
            qualityResults.push({name: '',q: '',date: ''})
        }
    })
    console.log(qualityResults);


    //update data in firebase realtime database

    const dbCityNames = [bitola,gostivar,kavadarci,kicevo,kocani,kumanovo,strumica,tetovo,veles,'miladinovci','lisice','karposh','rektorat','gazi-baba','lazaropole','centar'];

    qualityResults.map(res=>{
        console.log(res.name)
        dbCityNames.map(city=>{
            const name = res.name.toLowerCase();
            if(name.includes(city)){
                axios.patch('https://next-air.firebaseio.com/stations/'+city+'.json',{[res.date]:res.q}).then(()=>{
                    console.log('done')
                }).catch(error=>{
                    console.log(error)
                })
            }
        })
        const name = res.name.toLowerCase();
        if(name.includes('gazi baba')){
            axios.patch('https://next-air.firebaseio.com/stations/gazi-baba.json',{[res.date]:res.q}).then(()=>{
                console.log('gazi done')
            }).catch(error=>{
                console.log(error)
            })
        }
    })
}).catch(err=>{
    console.log(err)
})

