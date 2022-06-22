import type { NextPage } from "next"
import { useState, useEffect } from "react"
import { Spinner } from "@chakra-ui/react"
import { useUserContext } from "context/UserContext"
import { Box } from "@chakra-ui/react"
import { io } from "socket.io-client"
import { useRouter } from "next/router"
import ChatHeader from "components/chat/ChatHeader"
import ChatInput from "components/chat/ChatInput"
import ChatContent from "components/chat/ChatContent"

const Home: NextPage = () => {
  const { userLoading } = useUserContext()
  const [messageText, setMessageText] = useState("")
  const router = useRouter()

  useEffect((): any => {
    const socket = io("http://localhost:8000")
    socket.on("connect", () => console.log(`client ${socket.id} connected`))
    return socket.on("disconnect", () => console.log("server disconnected"))
  }, [])

  if (userLoading) {
    return <Spinner size="xl" speed="0.65s" thickness="3px" />
  }

  return (
    <Box display="flex" flexFlow="column" p="0 2rem 0 0.5rem">
      <ChatHeader />
      <ChatContent query={router.query} />
      <ChatInput messageText={messageText} setMessageText={setMessageText} query={router.query} />
    </Box>
  )
}

export default Home
