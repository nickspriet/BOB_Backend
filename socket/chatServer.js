/**
 * Created by Nick on 01/05/16.
 */

var chatServer = function (server) {
    var io = require('socket.io').listen(server);

    //listen for incoming sockets
    io.on('connection', function(socket){
        console.log('client', socket.id, 'connected');

        socket.on('new message', function(message){
            console.log(message);

            socket.emit('new message', message);
        });
    });
};

module.exports = chatServer;