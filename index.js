const express = require("express");
const https = require("https");

const app = express();
app.use(express.urlencoded({ extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});


app.post("/", function(req, res){
    const query = req.body.cityName;
    const appKey = "ac55e7c615e18b2f9f9bc05b0d2c9c20";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&appid="+ appKey;
    // /*============================HTTPS MODULE============================================================================*/
    https.get(url, function(response){ //https is a native Node module to GET response from other website(API)
        console.log(response.statusCode);// Status codes -> 200,404,403,etc.
        /*========================.on() METHOD===========================================================*/
        response.on("data", function(data){
            //console.log(data); //Data is the response we recieve from the API get request
            const weatherData = JSON.parse(data); //JSON.parse() will change the hexcode data to human readable JS object
            const temp = weatherData.main.temp;
            const feelsLike = weatherData.main.feels_like;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

            res.write('<head><meta charset="utf-8"></head>');
            res.write("<img src=" + imgUrl+ ">");
            res.write("<h1>Temperature is : "+ temp +"</h1>")
            res.write("<h1>Feels Like: "+ feelsLike +"</h1>");
            res.write("<h1>Description : "+ desc+"</h1>");
            res.send();
        });
    });
});


app.listen(5000, function() {
    console.log("Server is running on port 5000");
});