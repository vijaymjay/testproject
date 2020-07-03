require('dotenv').config()
const fs = require('fs');
const axios = require('axios')
const userservice = require('../service/userservice')
let config = require('../config');

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

exports.apiCall =function(req,res,next){
	const body = {};
	axios.post(`${config.baseurl}/call1`, body, {
	  headers: {
		'Authorization': 'Basic 123456'
	  }
	})
	.then((response) => {
		// var count = 0;
		axios.post(`${config.baseurl}/call2`,response.data, {
		  headers: {
			'Authorization': 'Basic 123456'
		  }
		})
		.then((secondresponse)=>{
			res.status(200).send(secondresponse.data);
		},
		(error)=>{
			/* if(error.response.status == 403 || error.response.status == 401 || error.response.status == 400){
				
				if(count < process.env.apiretry){
					
					exports.apiCall();	
					console.log(count);
					count++;
				}
				else{
					res.status(400).send(error.response.statusText);	
				}
			} */
			handleerror(error)
		})
    },
    (error) => {
      handleerror(error)
    })
}


function handleerror(error){
	if(error.response.status == 403 || error.response.status == 401 || error.response.status == 400){
		return error.response.statusText;
	}
}