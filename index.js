/**
 * @define dependencies
 * */
var express = require('express')
    ,app = express()
    ,http = require('http').Server(app)
    ,io = require('socket.io')(http)
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

io.on('connection', function(socket) {
    console.log('' +
        'user connected to server');
    socket.on('message', function() {
        var data = ['I am in office', 'I left from office', 'I left office yesterday', 'In the office', 'Ckeckout office','Log out'];
        socket.emit('server ready', data);
    });
    socket.on('disconnect', function() {
        console.log('user disconnected from server');
    });
});

/**
 * local port to start the app
 * */
http.listen(port,function(){
    console.log('server started at '+port,app.get('env'));
});



























