// create data.json that stores an array called entries
// IozLriEqiQzrqBcvXWhFShTKjZVjjRHV
// entries are {
//     inputs
//     'temp': Number,
//     'humidity': Number,
//     outputs: precipitation in 6hrs, precipitation
//     'label': Number
// }

const axios = require('axios');
const API_KEY = 'IozLriEqiQzrqBcvXWhFShTKjZVjjRHV'

let endpoint = 'data'

const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&units=metric&startdate=2010-05-01&enddate=2010-05-31&limit=30`

const getData = () => {return axios(url, { headers: {
    token: API_KEY
}})}

async function run() {
    let r = await getData();

    console.log(r.data.results.length)
}

run();