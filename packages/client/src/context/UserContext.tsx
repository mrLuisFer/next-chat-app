import { createContext, Dispatch, SetStateAction, useContext, useState, useEffect } from "react"
import type { IUserCtx } from "types/IUserContext"

// const user: string = `User@${nanoid()}`;
const userInitialValue: IUserCtx = {
  connected: false,
  setConnected: (b: boolean) => b,
  username: "",
  setUsername: (s: string) => s,
  avatar: "",
  setAvatar: (s: string) => s,
  userId: "",
  setUserId: (s: string) => s,
  userLoading: false,
  setUserLoading: (s: boolean) => s,
  userError: "",
}

export const UserCtx = createContext(userInitialValue)

export default function UserCtxProvider({ children }: { children: any }) {
  const [connected, setConnected] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")
  const [avatar, setAvatar] = useState<string>(
    "https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3"
  )
  const [userId, setUserId] = useState<string>("")
  const [userLoading, setUserLoading] = useState<boolean>(false)
  const [userError, setUserError] = useState<any>(null)

  return (
    <UserCtx.Provider
      value={{
        connected,
        setConnected,
        username,
        setUsername,
        avatar,
        setAvatar,
        userId,
        setUserId,
        setUserLoading,
        userLoading,
        userError,
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