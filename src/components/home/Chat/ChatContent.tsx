import { useEffect } from "react";
import * as io from "socket.io-client";
import { nanoid } from "nanoid";
import { useChatCtx } from "context/ChatContext";
import type { IMsg } from "types/IMsg";
import { useUserContext } from "context/UserContext";
import { Box } from "@chakra-ui/react";

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
      setChat((c) => [...c, message]);
    });

    if (socket) {
      return () => {
        setConnected(false);
        socket.disconnect();
      };
    }
  }, []);

  return (
    <Box overflowY="auto" h="480px" className="chatContent">
      {chat.length ? (
        chat.map((c) => (
          <div key={`msg_${nanoid()}`}>
            <span
              style={{
                width: "0.5rem",
                height: "0.5rem",
                borderRadius: "50%",
                background: connected ? "green" : "gray",
              }}
            >
              p
            </span>
            <span>{c.user === username ? "Me" : c.user}</span>: {c.msg}
          </div>
        ))
      ) : (
        <div>No chat messages</div>
      )}
    </Box>
  );
}
