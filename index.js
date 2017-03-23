var express = require('express');
var path = require('path');
var moment = require('moment');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    var fileName = path.join(__dirname, 'public/index.html');
    
    res.sendFile(fileName, function(err){
        if(err){
            console.log(err.message);
        } else {
            console.log("Sent to: " + fileName)
        }
    });
});

app.get('/:paramString', function(req, res){
    var date = moment.unix(req.params.paramString);
    if(!date.isValid()){
        date = moment(req.params.paramString, 'MMMM DD, YYYY', true);
        if(!date.isValid()){
            res.json({
                'date-formatted' : null,
                'unix' : null
            });
        }
    }
    
    res.json({
        'date-formatted' : date.format('MMMM DD, YYYY'),
        'unix' : date.format('x')
    });
});

app.listen(port, function(){
    console.log("Server listening on port " + port);
});


