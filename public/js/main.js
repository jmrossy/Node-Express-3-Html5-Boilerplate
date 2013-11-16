//===================
// Socket test code
//===================

$(document).ready(function() {
    var socket = io.connect('http://localhost');

    $('h1').bind('click', function() {
        console.log('Message received');
        socket.emit('message', 'Message Sent on ' + new Date() );
    });

    socket.on('server_message', function(data){
        console.log(data);
        $('.socket-test').append('<li>' + data + '</li>');
    });
});
