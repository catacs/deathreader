  
function Connection()
{
    var socket = io.connect('http://localhost');
    
    socket.emit('hello', { message: 'hola' });
    socket.on('hola', function (data) {
        console.log(data);
     });
}