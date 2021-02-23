const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

let clients = 0;
io.on('connection', (socket) => {
  clients++;
    console.log('No. of clients connected : ' + clients)
    socket.on('message', (msg) => {
        socket.broadcast.emit('message1', msg)
    })

})