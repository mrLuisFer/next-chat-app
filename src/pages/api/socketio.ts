import type { NextApiRequest } from "next"
import { Server as ServerIO } from "socket.io"
import { Server as HttpServer } from "http"
import type { NextApiResponseIo } from "types/NextApiResponse"

export const config = {
  api: {
    bodyParser: false,
  },
}

const socketioHandler = async (req: NextApiRequest, res: NextApiResponseIo) => {
  console.log(req)
  if (!res.socket.server.io) {
    console.log("New Socket.io server...")

    const httpServer: HttpServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
    })

    res.socket.server.io = io
  }
  res.end()
}

export default socketioHandler
