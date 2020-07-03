require('dotenv').config()

const express = require('express');
var router = express.Router();  

var controller = require('../controllers/userController'); 

const { check } = require('express-validator');
const { validationResult } = require('express-validator');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createfile',[
  check('filecount', 'Enter file count').not().isEmpty(),
  ], (req, res,next) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		controller.createfile(req, res,next)
	}
	else {
		res.status(400).send('Pass required fiedls');		
	}	
})

router.post('/call1',authenticationToken,(req, res,next) => {
	res.status(200).json({ username:'sunjay' });
})

router.post('/call2',authenticationToken,[
  check('username', 'Enter Username').not().isEmpty(),
  ], (req, res,next) => {
	  
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		
		controller.call2(req, res,next)
		
	}
	else{
		res.status(400).send('Pass required fiedls');			
	}
})



router.post('/apicall',(req,res,next)=>{
	controller.apiCall(req, res,next)
})



function authenticationToken(req,res,next){
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]
	
	if(token == null) return res.sendStatus(401)
		
	if(token == process.env.TOKEN){
		next();
	}
	else {
		return res.sendStatus(403)
	}
}


module.exports = router;