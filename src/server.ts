import { Server } from "socket.io";
import { Message } from "./interface/Chat";
import { TwoWayMap } from "./utils/client-human-map";

const chatHistory = new Map<string, Message[]>()

const server = new Server(5000, {
    cors: {
        allowedHeaders: '*',
        origin: '*',
        methods: '*'
    }
})

server.on('connection', (socket) => {
    console.log('Welcome to med assistance server your socket id is', socket.id)

    socket.on('chat-data', (input) => {
        if (!Array.isArray(input)) {
            TwoWayMap.set(socket.id, input)
            console.log('Returning chat Data for id', input)
            socket.emit('chat-data', chatHistory.get(input))
        } else {
            console.log('Recieved chat data')
            chatHistory.set(socket.id, input)
        }
    })

    socket.on('client', (message) => {
        const from = socket.id
        const to = TwoWayMap.get(from)
        console.log('FROM - ',from, 'TO - ', to)
        socket.broadcast.to(to ?? '').emit('server', message)
        console.log(message)
    })

    // socket.emit('server', "Hello client")
})
