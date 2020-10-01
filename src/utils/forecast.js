const request = require ('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=7c1e5c1c2bcc0f93d029be170e3e9667&units=metric'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }else if (body.cod) {
           // callback('Invalid coordinate! Try another.', undefined);
           callback(error, undefined);
        }else {
            callback(undefined, {
                Forecast: 'It is ' + body.current.weather[0].description 
                            + ' today!',
                Temperature: 'The temperature for today is '+ body.hourly[0].temp + ' degrees celcius.'
            });
        }
    });
};

module.exports = forecast;