require('./models/db');
let config = require('./config');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const router = require('./routes/routes'); 
const jwt = require('jsonwebtoken');


var userObj = { username : 'vijaym.jay' }
let token = jwt.sign({ user: userObj }, process.env.JWT_SECRET);

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

app.use(function(req, res, next) {
  res.status(HttpStatus.NOT_FOUND).send()
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
  res.send({
    "code": 80000,
    "api-message": err.message,
    "message": err.message
  })
});

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

app.set('views', path.join(__dirname, '/views/'));

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

