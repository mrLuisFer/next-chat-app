import Ably from "ably/promises"
import { NextApiRequest } from "next"
import { NextApiResponseIo } from "types/NextApiResponse"

export default async function handler(req: NextApiRequest, res: NextApiResponseIo) {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY || "")
  const tokenRequestData = await client.auth.createTokenRequest({ clientId: "ably-nextjs-demo" })
  res.status(200).json(tokenRequestData)
}
