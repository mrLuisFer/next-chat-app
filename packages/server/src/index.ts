import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'
io.on('connection', async (socket) => {
  console.log(`Client ${socket.id} connected`)
  const { roomId } = socket.handshake.query
  await socket.join(roomId as any)

  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId as any).emit(NEW_CHAT_MESSAGE_EVENT, data)
  })

  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected 'cause: ${reason}`)
  })
})

// io.listen(8000);
console.log(`Server on port ${8000}`)
httpServer.listen(8000)
