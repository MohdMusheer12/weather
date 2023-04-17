const fs = require('fs');
const express = require('express');
const app = express()
const path = require('path')
const hbs = require('hbs');
const http = require('http');
// const chalk = require('chalk');
const router = express.Router();
let url = "http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=0ea1b7b6522241387b4273c637341072";


app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    http.get(url, (resp) => {
        let body = "";

        resp.on("data", (chunk) => {
            body += chunk;
        })
        resp.on("end", () => {
            try {
                let api_data = JSON.parse(body);
                res.render('index', { data:  api_data ,tempr: parseInt(api_data.main.temp - 273.15),name:api_data.name,min:parseInt(api_data.main.temp_min-273.15),max:parseInt(api_data.main.temp_max-273.15)})
            }
            catch (err) {
                console.log(err);
            }
        })
    }).on("error", (err) => {
        console.log(err);
    })
})


app.listen(3000, () => {
    console.log("Server has been started at port 3000");
})



