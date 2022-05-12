import { SetStateAction } from "react"

export interface IUserCtx {
  connected: boolean
  setConnected: Dispatch<SetStateAction<boolean>>
  userLoading: boolean
  setUserLoading: Dispatch<SetStateAction<boolean>>
}
