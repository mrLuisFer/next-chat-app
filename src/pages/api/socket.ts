import type { NextApiRequest } from "next"
import { Server as ServerIO } from "socket.io"
import { Server as HttpServer } from "http"
import type { NextApiResponseIo } from "types/NextApiResponse"

export const config = {
  api: {
    bodyParser: false,
  },
}

const users: any[] = []

const addUser = (id: string | number, name: string, room: any) => {
  const existingUser = users.find((user) => user.name.trim().toLowerCase() === name.trim().toLowerCase())
  if (existingUser) return { error: "Username has already been taken" }
  if (!name && !room) return { error: "Username and room are required" }
  if (!name) return { error: "Username is required" }
  if (!room) return { error: "Room is required" }
  const user = { id, name, room }
  users.push(user)
  return { user }
}

const getUser = (id: string | number) => {
  let user = users.find((user) => user.id == id)
  return user
}

const deleteUser = (id: string | number) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) return users.splice(index, 1)[0]
}

const getUsers = (room: any) => users.filter((user) => user.room === room)

const socketHandler = async (req: NextApiRequest, res: NextApiResponseIo) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...")
    const httpServer: HttpServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
    })
    res.socket.server.io = io
    io.on("connection", (socket) => {
      socket.on("login", ({ name, room }, callback) => {
        const { user, error } = addUser(socket.id, name, room)
        if (error) return callback(error)
        socket.join(user?.room)
        socket
          .in(room)
          .emit("notification", { title: "Someone's here", description: `${user?.name} just entered the room` })
        io.in(room).emit("users", getUsers(room))
        callback()
      })

      socket.on("sendMessage", (message) => {
        const user = getUser(socket.id)
        io.in(user.room).emit("message", { user: user.name, text: message })
      })

      socket.on("disconnect", () => {
        console.log("User disconnected")
        const user = deleteUser(socket.id)
        if (user) {
          io.in(user.room).emit("notification", {
            title: "Someone just left",
            description: `${user.name} just left the room`,
          })
          io.in(user.room).emit("users", getUsers(user.room))
        }
      })
    })
  }

  res.end()
}

export default socketHandler
