var express = require('express')
    ,app = express()
    ,port = process.env.PORT||3000
    ,bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('./app'));

app.use('/',function(req,res){
    console.log(req.url);
});

app.listen(port,function(){
    console.log('server started at '+port);
});



























