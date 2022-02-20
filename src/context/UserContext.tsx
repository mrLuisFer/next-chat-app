import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IUserCtx {
  connected: boolean;
  setConnected: Dispatch<SetStateAction<boolean>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  avatar: string;
  setAvatar: Dispatch<SetStateAction<string>>
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
}

// const user: string = `User@${nanoid()}`;
const userInitialValue: IUserCtx = {
  connected: false,
  setConnected: (b) => b,
  username: '',
  setUsername: (s) => s,
  avatar: '',
  setAvatar: (s) => s,
  userId: '',
  setUserId: (s) => s
};

export const UserCtx = createContext(userInitialValue);

export default function UserCtxProvider({ children }: { children: any }) {
  const [connected, setConnected] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('https://external-preview.redd.it/4PE-nlL_PdMD5PrFNLnjurHQ1QKPnCvg368LTDnfM-M.png?auto=webp&s=ff4c3fbc1cce1a1856cff36b5d2a40a6d02cc1c3')
  const [userId, setUserId] = useState<string>('')

  return (
    <UserCtx.Provider
      value={{ connected, setConnected, username, setUsername, avatar, setAvatar, userId, setUserId }}
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
