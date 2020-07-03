require('dotenv').config()
const fs = require('fs');
const axios = require('axios')
const userservice = require('../service/userservice')
let config = require('../config');

var count = 0;

exports.createfile = function(req, res, next){
	let input = req.body;
	for(let i=1; i<=input.filecount; i++){
		fs.writeFile(`file${i}.txt`, `Hello ${i}`, function (err) {
		  if (err) throw err;
		});
	}
	console.log('Generated successfully')
	res.status(200).send('Generated successfully');
};

exports.call2 = function(req,res,next){
	userservice.getuserdetails(req,res,next);
}

exports.apiCall =function(req,getresponse,next){
	const body = {};
	axios.post(`${config.baseurl}/call1`, body, {
	  headers: {
		'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidmlqYXltLmpheSJ9LCJpYXQiOjE1OTM3ODQ1NDV9.I5SCDZSqIXbKeCrnMh9N6D_wirbyBhIsVlF6O0_vVLw'
	  }
	})
	.then((response) => {
		
		axios.post(`${config.baseurl}/call2`,response.data, {
		   headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidmlqYXltLmpheSJ9LCJpYXQiOjE1OTM3ODQ1NDV9.I5SCDZSqIXbKeCrnMh9N6D_wirbyBhIsVlF6O0_vVLw'
		  } 
		  
		})
		.then((secondresponse)=>{
			getresponse.status(200).send(secondresponse.data);
		})
		.catch((error)=>{
			 if(error.response.status == 403 || error.response.status == 401 || error.response.status == 400){
				
				if(count < process.env.apiretry){
					
					exports.apiCall();	
					count++;
				}
				else{
					
					getresponse.status(400).send('Invalid token');
					
				}
			} 
			
		})
    })
    .catch((error) => {
      if(error.response.status == 403 || error.response.status == 401 || error.response.status == 400){
				
				if(count < process.env.apiretry){
					
					exports.apiCall();	
					count++;
				}
				else{
					
					getresponse.status(400).send('Invalid token');
					
				}
			}
    })
}


