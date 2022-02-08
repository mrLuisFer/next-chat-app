import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { IMsg } from "types/IMsg";
import { useUserContext } from "context/UserContext";
import { Box } from "@chakra-ui/react";

export default function ChatInputs() {
  const [msg, setMsg] = useState<string>("");
  const { connected, username } = useUserContext();
  const inputRef: any = useRef(null);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg) {
      const message: IMsg = {
        user: username,
        msg,
      };

      const resp: Response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (resp.ok) setMsg("");
      console.log(msg);
    }

    inputRef?.current?.focus();
  };

  return (
    <Box position="fixed" bottom="3rem" w="100%" h="min-content">
      <form onSubmit={(e) => handleSendMessage(e)}>
        <input
          ref={inputRef}
          type="text"
          value={msg}
          placeholder={connected ? "Type a message..." : "Connecting..."}
          disabled={!connected}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setMsg(e.target.value);
          }}
        />
        <button disabled={!connected}>SEND</button>
      </form>
    </Box>
  );
}
