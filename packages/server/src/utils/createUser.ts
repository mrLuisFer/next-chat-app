import type { User } from "../types/index"
import { nanoid } from "nanoid"
import toString from "./toString"

const createUser = ({ username, password }: any): User => {
  const newUser: User = {
    username: toString(username),
    password: toString(password),
    id: nanoid(),
  }

  return newUser
}

export default createUser
