var express = require('express')
    ,app = express()
    ,http = require('http').Server(app)
    ,io = require('socket.io')(http)
    ,port = process.env.PORT||3000
    ,bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('./app'));

app.use('/',function(req,res){
    console.log(req.url);
});

io.sockets.on('connection', function(socket) {
    console.log('a user connected to server');

    socket.on('message', function(message) {
        console.log('message : ' + message);
        var data = ["I am in office", "I left office now"];
        socket.emit('server ready', data);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected from server');
    });
});

http.listen(port,function(){
    console.log('server started at '+port,app.get('env'));
});



























