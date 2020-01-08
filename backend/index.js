const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require ('./config/database');
const path = require ('path');
const authetication = require('./routes/authetication')(router);
const bodyParser = require('body-parser');

mongoose.connect(config.uri,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
    if (err) {
        console.log('DB connection error', err)
    } else {
        console.log('Connected to DB: ' + config.db)
    }
});


//middleware
// parse application/x-www-form-urlencoded - top
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json - top
app.use(bodyParser.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static('/Users/dwightshrute/Documents/travelleads/ngfrontend/dist'));
app.use('/authentication',authetication);

app.get('*', (req, res) => {

    res.sendFile('/Users/dwightshrute/Documents/travelleads/ngfrontend/dist/index.html');
  });
  


app.listen(8080, () =>{
    console.log('Listening on port 8080')
}
);