import { useState, useEffect } from "react"
import { Box } from "@chakra-ui/react"
import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
import { io } from "socket.io-client"
import ChatContent from "./ChatContent"
import { useRouter } from "next/router"

export default function Chat() {
  const [messageText, setMessageText] = useState("")
  const router = useRouter()

  useEffect((): any => {
    const socket = io("http://localhost:8000")

    socket.on("connect", () => console.log(`client ${socket.id} connected`))

    return socket.on("disconnect", () => console.log("server disconnected"))
  }, [])

  return (
    <Box display="flex" flexFlow="column" p="0 2rem 0 0.5rem">
      <ChatHeader />
      <ChatContent query={router.query} />
      <ChatInput messageText={messageText} setMessageText={setMessageText} query={router.query} />
    </Box>
  )
}
