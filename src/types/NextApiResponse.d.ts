import { Server } from "http"
import { NextServer } from "next/dist/server/next"
import type { NextResponse, NextApiResponse } from "next"
import { Server as SocketIoServer } from "socket.io"

export type NextApiResponseIo = NextApiResponse & {
  socket: Server & {
    server: NextServer & {
      io: SocketIoServer
    }
  }
}
