const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require ('./config/database')
const path = require ('path')

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('DB connection error', err)
    } else {
        console.log('Connected to DB: ' + config.db)
    }
});

app.use(express.static('/Users/dwightshrute/Documents/travelleads/frontend/dist'));

app.get('*', (req, res) => {
    res.sendFile('/Users/dwightshrute/Documents/travelleads/frontend/dist/index.html');
  });
  


app.listen(8080, () =>{
    console.log('Listening on port 8080')
}
);