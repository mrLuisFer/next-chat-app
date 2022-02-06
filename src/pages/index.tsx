import { useState, useEffect, useRef } from "react";
import * as io from "socket.io-client";
import type { NextPage } from "next";

interface IMsg {
  user: string;
  msg: string;
}

const user: string = `User@${new Date().getTime()}`;

const Home: NextPage = () => {
  const inputRef: any = useRef(null);

  const [connected, setConnected] = useState<boolean>(false);
  const baseUrl: string = process.env.BASE_URL!;

  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>("");

  useEffect((): any => {
    const socket = io.connect(baseUrl, {
      path: "/api/socketio",
    });

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    socket.on("message", (message: IMsg) => {
      chat.push(message);
      setChat([...chat]);
    });

    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (msg) {
      const message: IMsg = {
        user,
        msg,
      };

      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (resp.ok) setMsg("");
    }

    inputRef?.current?.focus();
  };

  return (
    <div>
      <div>
        {chat.length ? (
          chat.map((chat, i) => (
            <div key={"msg_" + i}>
              <span>{chat.user === user ? "Me" : chat.user}</span>: {chat.msg}
            </div>
          ))
        ) : (
          <div>No chat messages</div>
        )}
      </div>
      <div>
        <div>
          <div>
            <input
              ref={inputRef}
              type="text"
              value={msg}
              placeholder={connected ? "Type a message..." : "Connecting..."}
              disabled={!connected}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
          </div>
          <div>
            <button onClick={sendMessage} disabled={!connected}>
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
