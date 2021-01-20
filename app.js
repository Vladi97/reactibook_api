const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//import ROUTES
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://freeway:' + 
process.env.DB_CONNECTION +
'@cluster0-y45xa.mongodb.net/reactibook?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));

app.use((re, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, mext) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin' , '*');//"*" permite cualquier origen //por otro ladi se podría también poner  'http://my-domain.com'
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');// que tipos de headers se aceptan: Pueden ser 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

module.exports = app;