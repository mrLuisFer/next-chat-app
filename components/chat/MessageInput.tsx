import type { KeyboardEvent } from "react";
import { useState } from "react";

interface TMessageInputProps {
  onSubmit: (message: string) => void;
}

const MessageInput = ({ onSubmit }: TMessageInputProps): JSX.Element => {
  const [messageText, setMessageText] = useState("");

  const submitOnEnter = (event: KeyboardEvent<HTMLInputElement>): void => {
    // Watch for enter key
    if (event.keyCode === 13 || event.key === "Enter") {
      onSubmit(messageText);
      setMessageText("");
    }
  };

  return (
    <input
      className="shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      placeholder="Send a message"
      value={messageText}
      onChange={(e) => {
        setMessageText(e.target.value);
      }}
      onKeyDown={(e) => {
        submitOnEnter(e);
      }}
    />
  );
};

export default MessageInput;
