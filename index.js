var express = require('express');
var path = require('path');
var moment = require('moment');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:paramString', function(req, res){
    var date = moment.unix(req.params.paramString);
    if(!date.isValid()){
        date = moment(req.params.paramString, 'MMMM DD, YYYY');
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


