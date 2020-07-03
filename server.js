require('./models/db');
let config = require('./config');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const router = require('./routes/routes'); 


const winston = require('winston');
const expressWinston = require('express-winston');


var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use('/', router);

app.use(expressWinston.errorLogger({
				transports: [
					new winston.transports.File(config.options), 
					]
			  }));

app.use(function(err,req,res,next){
	res.status(422).send({error:err.message});
})

app.set('views', path.join(__dirname, '/views/'));

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

