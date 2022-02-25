export interface IUserCtx {
  connected: boolean
  setConnected: Dispatch<SetStateAction<boolean>>
  username: string
  setUsername: Dispatch<SetStateAction<string>>
  avatar: string
  setAvatar: Dispatch<SetStateAction<string>>
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
  userLoading: boolean
  setUserLoading: Dispatch<SetStateAction<boolean>>
  userError: any
}
