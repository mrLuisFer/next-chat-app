import { useState, useEffect } from "react";
import * as io from "socket.io-client";
import { nanoid } from "nanoid";
import type { IMsg } from "types/IMsg";
import ChatInputs from "./ChatInputs";
import { useChatCtx } from "context/ChatContext";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const user: string = `User@${new Date().getTime()}`;

export default function Chat() {
  const [connected, setConnected] = useState<boolean>(false);
  const { chat, setChat } = useChatCtx();

  // Can use the hook useCallback (?)
  const handleSocketIoConnection = () => {
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

    if (socket) return () => socket.disconnect();
  };
  useEffect((): any => {
    handleSocketIoConnection();
  }, []);

  return (
    <>
      <div>
        {chat.length ? (
          chat.map((c) => (
            <div key={`msg_${nanoid()}`}>
              <span>{c.user === user ? "Me" : c.user}</span>: {c.msg}
            </div>
          ))
        ) : (
          <div>No chat messages</div>
        )}
      </div>
      <ChatInputs connected={connected} user={user} />
    </>
  );
}
