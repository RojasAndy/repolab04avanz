const express = require ('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

app.use(express.static(__dirname + '/static'));

const {Server} = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado')
})

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado')
    })
})

io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
        console.log('Mensaje: ' + msg)
    })
})

io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
        io.emit('chat', msg)
    })
})

app.get('/', (req, resp) => {
    resp.sendFile('./static/index-2.html', {
        root: __dirname
    })
})


server.listen(3000,() => {
    console.log('Servidor corriendo en http://localhost:3000')
})

