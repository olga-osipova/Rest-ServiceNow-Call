var express = require('express'); 
var app = express();
app.use(express.static('test8'));

var http = require('http');
var fs = require('fs');




app.get('/', function(req, res) {
	
	fs.readFile('test_8_servicenow.html', 'utf8', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
	
});

 
 
app.listen(8080);