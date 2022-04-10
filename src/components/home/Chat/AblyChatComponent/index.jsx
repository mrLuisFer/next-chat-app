import { useState, useEffect } from "react"
import { useChannel } from "./useChannel"

export default function AblyChatComponent() {
  let inputBox = null
  let messageEnd = null

  const [messageText, setMessageText] = useState("")
  const [receivedMessages, setMessages] = useState([])
  const messageTextIsEmpty = messageText.trim().length === 0
  const [channel, ably] = useChannel("chat-demo", (message) => {
    const history = receivedMessages.slice(-199)
    setMessages([...history, message])
  })

  const sendChatMessage = (messageText) => {
    channel.publish({ name: "chat-message", data: messageText })
    setMessageText("")
    inputBox.focus()
  }

  const handleFormSubmission = (event) => {
    event.preventDefault()
    sendChatMessage(messageText)
  }

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return
    }
    sendChatMessage(messageText)
    event.preventDefault()
  }
  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other"
    return (
      <p key={index} data-author={author}>
        {message.data}
      </p>
    )
  })

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" })
  })

  return (
    <div>
      <div>
        {messages}
        <div
          ref={(element) => {
            messageEnd = element
          }}
        ></div>{" "}
      </div>
      <form onSubmit={handleFormSubmission}>
        <textarea
          ref={(element) => {
            inputBox = element
          }}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
        ></textarea>
        <button type="submit" disabled={messageTextIsEmpty}>
          Send
        </button>
      </form>
    </div>
  )
}
