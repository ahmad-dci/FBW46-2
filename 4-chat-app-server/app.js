const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.static(__dirname + '/public'))

app.use(cors());

const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on('connection', (socket) => { 

    socket.join('room');
    
console.log('connected');
socket.on('message', data => {
    console.log(data);
    socket.broadcast.to('room').emit('message', data);
})
});



app.use( (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

server.listen(5500, () =>{
    console.log(`app is listening to port 5500`);
})

