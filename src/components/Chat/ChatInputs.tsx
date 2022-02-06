import { useRef, useState } from "react";
import { IMsg } from "types/IMsg";

interface ChatInputsProps {
  connected: boolean;
  user: string
}

export default function ChatInputs({ connected, user }: ChatInputsProps) {
  const [msg, setMsg] = useState<string>("");
  const inputRef: any = useRef(null);

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
  );
}
