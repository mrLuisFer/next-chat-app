import { createContext, Dispatch, SetStateAction, useContext, useState, useEffect } from "react"
import type { IUserCtx } from "types/IUserContext"

const userInitialValue: IUserCtx = {
  connected: false,
  setConnected: (b: boolean) => b,
  userLoading: false,
  setUserLoading: (b: boolean) => b,
}

export const UserCtx = createContext(userInitialValue)

export default function UserCtxProvider({ children }: { children: any }) {
  const [connected, setConnected] = useState<boolean>(false)
  const [userLoading, setUserLoading] = useState<boolean>(false)

  return (
    <UserCtx.Provider
      value={{
        connected,
        setConnected,
        userLoading,
        setUserLoading,
      }}
    >
      {children}
    </UserCtx.Provider>
  )
}

export const useUserContext = (): IUserCtx => {
  const ctx = useContext(UserCtx)
  if (ctx === undefined) {
    throw new Error("useConnectedCtx must be used within a ConnectedProvider")
  }

  return ctx
}
