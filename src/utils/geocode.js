const request = require('request');

const geocode = (address, callback) =>{
    const url_location = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGFsbGF2MTIzIiwiYSI6ImNrYnlqcTNyODBmMTQyeG1yc3c3NzBhNGwifQ.3QqfDuflPhnwPPV6lAIsxw&limit=1`;
    request({url: url_location, json: true},(error, { body })=>{
        if(error){
            callback("unable to connect to the  api",undefined);
        }
        else if(body.features.length === 0){
            callback("invalid api call",undefined);
        }
        else{
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const place = body.features[0].place_name;
            callback(undefined, {latitude,longitude,place});
        }  
    });
};

module.exports = geocode;