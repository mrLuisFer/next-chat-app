import { NextApiRequest } from "next"
import type { NextApiResponseIo } from "types/NextApiResponse"

const chatHandler = (req: NextApiRequest, res: NextApiResponseIo) => {
  const method: string = req.method!.toUpperCase()
  if (method === "GET") {
    return res.status(200).json({ msg: "Method should be POST" })
  }

  if (method === "POST") {
    const msg = req.body
    res.socket.server.io.emit("message", msg)

    return res.status(200).json(msg)
  }
}

export default chatHandler
