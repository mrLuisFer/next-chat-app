import type { NextApiRequest, NextApiResponse } from "next"
import { nanoid } from "nanoid"

interface User {
  username: string
  password: string
  id: string
}

const createUser = ({ username, password }: any): User => {
  const newUser: User = {
    username: `${username}`,
    password: `${password}`,
    id: nanoid(),
  }

  return newUser
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userObj = req.body
    if (!userObj) {
      res.status(500).json({ ok: false, status: 500 })
      return
    }

    const user = createUser({
      username: userObj.username,
      password: userObj.password,
    })
    console.log(user)
    res.status(200).json({ ok: true, status: 200, user })
  }
}
