import { useEffect } from "react"
import * as io from "socket.io-client"
import { nanoid } from "nanoid"
import { useChatCtx } from "context/ChatContext"
import type { IMsg } from "types/IMsg"
import { useUserContext } from "context/UserContext"
import { Box, UnorderedList } from "@chakra-ui/react"
import UserMessage from "./UserMessage"

export default function ChatContent() {
  const { chat, setChat } = useChatCtx()
  const { setConnected } = useUserContext()

  const baseUrl: string = process.env.BASE_URL!
  const socket = io.connect(baseUrl, {
    path: "/api/socket",
  })
  useEffect((): any => {
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id)
      setConnected(true)
    })

    socket.on("chat-message", (message: IMsg) => {
      setChat((c: IMsg[]) => [...c, message])
    })

    if (socket) {
      return () => {
        setConnected(false)
        socket.disconnect()
      }
    }
  }, [])

  return (
    <Box overflowY="auto" h="460px" className="chatContent">
      <UnorderedList styleType="none" display="flex" flexDirection="column" gap="1rem 0" margin="0">
        {chat.length ? chat.map((msg) => <UserMessage key={nanoid()} msg={msg} />) : <div>No chat messages</div>}
      </UnorderedList>
    </Box>
  )
}
