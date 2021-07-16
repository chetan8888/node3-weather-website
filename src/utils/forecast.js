const request = require('request')

const forecast = (latitude,longitude,callback) =>
{
    const url = "http://api.weatherstack.com/current?access_key=4573cdb8d6e285beb67e3ad127651751&query=" + latitude + "," + longitude + "&units=m"

    // const url = "http://api.weatherstack.com/current?access_key=4573cdb8d6e285beb67e3ad127651751&query=37.8267,-122.4233&units=m"

    // Object destructuring used for url parameter and response.body
    request({url, json: true}, (error,{body}) =>
    {
        if (error)
        {
            callback("Unable to connect to weather services",undefined)
        }
        else if (body.error)
        {
            callback(undefined,body)
        }
        else
        {
            callback(undefined,"It is currently " + body.current.temperature + " degrees in " + body.location.region + ". There is " + body.current.precip + "% chance of rain.")
        }
    })
}

module.exports = forecast
