import { Box, Img, Text, ListItem } from "@chakra-ui/react"
import type { IMsg } from "types/IMsg"
import { useUserContext } from "context/UserContext"
import "./UserMessage.module.css"

interface UserMessageProps {
  msg: IMsg
}

export default function UserMessage({ msg }: UserMessageProps) {
  const { connected, avatar } = useUserContext()

  return (
    <ListItem display="flex" alignItems="center">
      <Box position="relative">
        <Img src={avatar} alt={msg.user} borderRadius="50%" w="45px" h="45px" />
        <div className={connected ? "connected" : ""} />
      </Box>
      <Box marginLeft="0.5rem">
        <Text color="red.100">{msg.user}</Text>
        <Text as="span">{msg.msg}</Text>
      </Box>
    </ListItem>
  )
}
