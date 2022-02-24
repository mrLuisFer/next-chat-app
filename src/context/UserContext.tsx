import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect
} from "react";
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebase } from 'lib/Firebase'
import type { IUserCtx } from 'types/IUserContext'

// const user: string = `User@${nanoid()}`;
const userInitialValue: IUserCtx = {
  connected: false,
  setConnected: (b) => b,
  username: '',
  setUsername: (s) => s,
  avatar: '',
  setAvatar: (s) => s,
  userId: '',
  setUserId: (s) => s,
  userLoading: false,
  setUserLoading: (s) => s
};

export const UserCtx = createContext(userInitialValue);

export default function UserCtxProvider({ children }: { children: any }) {
  const [connected, setConnected] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3')
  const [userId, setUserId] = useState<string>('')
  const [userLoading, setUserLoading] = useState<boolean>(false)
  const [userError, setUserError] = useState<any>(null)

  const auth: any = firebase.auth()
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      const username: string = user?.displayName as string
      const avatar: string = user?.photoURL as string
      const id: string = user?.uid as string

      setUsername(username)
      setAvatar(avatar)
      setUserId(id)
      setUserLoading(loading)
      if (error) setUserError(error)
    }
  }, [user])

  return (
    <UserCtx.Provider
      value={{ connected, setConnected, username, setUsername, avatar, setAvatar, userId, setUserId, setUserLoading, userLoading }}
    >
      {children}
    </UserCtx.Provider>
  );
}

export const useUserContext = (): IUserCtx => {
  const ctx = useContext(UserCtx);
  if (ctx === undefined) {
    throw new Error("useConnectedCtx must be used within a ConnectedProvider");
  }

  return ctx;
};
