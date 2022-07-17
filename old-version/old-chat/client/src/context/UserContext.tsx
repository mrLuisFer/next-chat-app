import { createContext, Dispatch, SetStateAction, useContext, useState, useEffect, Context } from "react"
import type { IUserCtx } from "types/IUserContext"

const userInitialValue: IUserCtx = {
  connected: false,
  email: "",
  username: "",
  id: "",
}

export const UserCtx = createContext({
  user: userInitialValue,
  setUser: (t: any) => t,
})

export default function UserCtxProvider({ children }: { children: any }) {
  const [user, setUser] = useState<IUserCtx>(userInitialValue)

  return <UserCtx.Provider value={{ setUser, user }}>{children}</UserCtx.Provider>
}

export const useUserContext = (): {
  user: IUserCtx
  setUser: Dispatch<SetStateAction<IUserCtx>>
} => {
  const ctx = useContext(UserCtx)
  if (ctx === undefined) {
    throw new Error("useConnectedCtx must be used within a ConnectedProvider")
  }

  return ctx
}
