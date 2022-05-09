import { useEffect, useRef, useState } from "react"
import socketIOClient from "socket.io-client"

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"
const SOCKET_SERVER_URL = "http://localhost:8000"

export const useChat = (roomId: any) => {
  const [messages, setMessages] = useState<string[]>([""])
  const socketRef = useRef<any>()

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    })

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: any) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      }
      setMessages((messages: string[]) => [...messages, incomingMessage])
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [roomId])

  const sendMessage = (messageBody: any) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    })
  }

  return { messages, sendMessage }
}
