const request = require('request');

const geoCode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYXJwaXQxMjExIiwiYSI6ImNqejZrZ2oyYTBhZ3IzYnE4Z3lwOXlxZ2EifQ.mKD-h9Qoj7RPiGzDCWco9g&limit=1"

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback({
                error: "Unable to connect to Weather API"
            });
        } else if(body.features.length === 0){
            callback({
                error: "No Location Found"
            });
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:   body.features[0].place_name
            })
        }
    } )
}

module.exports = geoCode