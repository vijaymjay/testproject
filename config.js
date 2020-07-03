
let settings = {}

settings.options = {
			  level: 'error',
			  filename: './logs/logissues.log',
			  timestamp: true,
			  json: true,
			  handleExceptions: true,
		}
		
settings.baseurl = 'http://localhost:3000';		
			
module.exports= settings;