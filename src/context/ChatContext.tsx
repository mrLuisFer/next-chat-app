import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IMsg } from "types/IMsg";

interface IChatState {
  chat: IMsg[];
  setChat: Dispatch<SetStateAction<IMsg[]>>;
}

const ctxInitialValue: IChatState = {
  chat: [],
  setChat: () => [],
};

export const ChatContext = createContext(ctxInitialValue);

export default function ChatContextProvider({ children }: { children: any }) {
  const [chat, setChat] = useState<IMsg[]>([]);

  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatCtx = (): IChatState => {
  const { chat, setChat } = useContext(ChatContext);
  if (chat === undefined || setChat === undefined) {
    throw new Error("useChatCtx must be used within a ChatContextProvider");
  } else {
    return { chat, setChat };
  }
};
