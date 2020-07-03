const mongoose = require('mongoose');
const User = mongoose.model('User');

function Userservice(){
}

Userservice.prototype.getuserdetails =  function(req,res,next){
	let input = req.body;
	User.find({username:input.username}).then((data)=>{
		res.status(200).send(data);
	}).catch(next);
}

module.exports = new Userservice();
