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
    socket.on('chat-data', (input) => {
        if (!Array.isArray(input)) {
            TwoWayMap.set(socket.id, input)
            socket.emit('chat-data', chatHistory.get(input))
        } else {
            chatHistory.set(socket.id, input)
        }
    })

    socket.on('client', (message) => {
        const from = socket.id
        const to = TwoWayMap.get(from)
        socket.broadcast.to(to ?? '').emit('server', message)
    })
})
