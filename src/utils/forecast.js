const request = require('request');

const forecast = ({latitude, longitude}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fce9539d86edd8578e25ae28b1adc7b2&query=${latitude},${longitude}&units=f`;

    request({url,json:true},(error,{ body })=>{
        if(error){
            callback("unable to connect to the  api",undefined);
        }
        else if(body.error){
            callback("invalid api call",undefined);
        }
        else{
            callback(undefined,body.current);
        }
    });
};

module.exports = forecast;