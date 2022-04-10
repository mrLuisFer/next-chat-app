import { useState, useEffect } from "react"
import { useChannel } from "./useChannel"
import Messages from "./Messages"
import ChatInput from "../ChatInput"

export default function AblyChatComponent() {
  let inputBox = null
  let messageEnd = null

  const [messageText, setMessageText] = useState("")
  const [receivedMessages, setMessages] = useState([])

  const [channel, ably] = useChannel("chat-demo", (message) => {
    const history = receivedMessages.slice(-199)
    setMessages([...history, message])
  })

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" })
  })

  return (
    <div>
      <div>
        <Messages receivedMessages={receivedMessages} ably={ably} />
        <div
          ref={(element) => {
            messageEnd = element
          }}
        ></div>
      </div>
      <ChatInput inputBox={inputBox} messageText={messageText} channel={channel} setMessageText={setMessageText} />
    </div>
  )
}
