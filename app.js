const { Socket } = require('dgram');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket)=>{
    //console.log(socket.id);
    // return false;
    console.log('user connected');
    socket.on('chatMessage', (data)=>{
        console.log(data)
        socket.emit('message', "this is first hellow")
        //console.log('message : ' + msg);
    })
})

http.listen(2000, () => {
  console.log('listening on *:3000');
});