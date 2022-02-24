import { useEffect } from "react";
import * as io from "socket.io-client";
import { nanoid } from "nanoid";
import { useChatCtx } from "context/ChatContext";
import type { IMsg } from "types/IMsg";
import { useUserContext } from "context/UserContext";
import { Box } from "@chakra-ui/react";
import UserMessage from './UserMessage'

export default function ChatContent() {
  const { chat, setChat } = useChatCtx();
  const { connected, setConnected, username } = useUserContext();

  useEffect((): any => {
    const baseUrl: string = process.env.BASE_URL!;
    const socket = io.connect(baseUrl, {
      path: "/api/socketio",
    });

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    socket.on("message", (message: IMsg) => {
      setChat((c: IMsg[]) => [...c, message]);
    });

    if (socket) {
      return () => {
        setConnected(false);
        socket.disconnect();
      };
    }
  }, []);

  return (
    <Box overflowY="auto" h="460px" className="chatContent">
      {chat.length ? (
        chat.map((msg) => (
          <UserMessage key={nanoid()} msg={msg} />
        ))
      ) : (
        <div>No chat messages</div>
      )}
    </Box>
  );
}
