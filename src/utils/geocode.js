const request = require('request')

const geocode = (address, callback) => {    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiYWdtYXIyOCIsImEiOiJja2Y4MTh4cnYwN3VvMnNyMHJwb2pkcGIxIn0.3lwXLZh9dllvZeRp9JNkhQ&limit=1'
    

    request({url, json: true}, (error, {body, latitude, longitude, location}) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        }else if(body.features.length === 0){
            callback('Unable to find your location! Try another search.', undefined);
        }else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        } 
    });
}

module.exports= geocode
