import type { NextApiRequest, NextApiResponse } from "next"
import { nanoid } from "nanoid"

interface User {
  username: string
  password: string
  email: string
}

interface UserWithId extends User {
  id: string
}

const createUser = ({ username, password, email }: User): UserWithId => {
  const newUser: UserWithId = {
    username: `${username}`,
    password: `${password}`,
    email: `${email}`,
    id: nanoid(),
  }

  return newUser
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userObj = req.body
    if (!userObj) {
      res.status(500).json({ ok: false, status: 500, msg: "Username and Password needs to be provide" })
      return
    }

    const user = createUser({
      username: userObj.username,
      password: userObj.password,
      email: userObj.email,
    })
    console.log(user)
    res.status(200).json({ ok: true, status: 200, user })
  }
}
