/**
 * @define dependencies
 * */
var express = require('express')
    ,app = express()
    , http = require('http').Server(app)
    ,port = process.env.PORT||3000
    ,bodyParser = require('body-parser');

/** 
 * middleware
 * */
app.use(bodyParser.json());
app.use(express.static('./app'));
app.use('/',function(req,res){
    console.log(req.url);
});

/**
 * local port to start the app
 * */
http.listen(port,function(){
    console.log('server started at '+port,app.get('env'));
});



























