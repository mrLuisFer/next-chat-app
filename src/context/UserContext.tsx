import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { nanoid } from "nanoid";

interface IUserCtx {
  connected: boolean;
  setConnected: Dispatch<SetStateAction<boolean>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

// const user: string = `User@${nanoid()}`;
const userInitialValue: IUserCtx = {
  connected: false,
  setConnected: (b) => b,
  username: '',
  setUsername: (s) => s,
};

export const UserCtx = createContext(userInitialValue);

export default function UserCtxProvider({ children }: { children: any }) {
  const [connected, setConnected] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  return (
    <UserCtx.Provider
      value={{ connected, setConnected, username, setUsername }}
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
