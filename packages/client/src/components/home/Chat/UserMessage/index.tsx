import { useState } from "react"
import { Box, Img, Text, ListItem } from "@chakra-ui/react"
import Link from "next/link"
import type { IMsg } from "types"
import { useUserContext } from "context/UserContext"
import "./UserMessage.module.css"

interface UserMessageProps {
  msg: any
}

export default function UserMessage({ msg }: UserMessageProps) {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { connected } = useUserContext()

  return (
    <>
      <ListItem display="flex" alignItems="center" position="relative">
        <Box position="relative" onMouseEnter={() => setShowModal(true)} onMouseLeave={() => setShowModal(false)}>
          <Link href={`/user/123`}>
            <a>
              <Img src={""} alt={msg.user} borderRadius="50%" w="45px" h="45px" />
              <div className={connected ? "connected" : ""} />
            </a>
          </Link>
        </Box>
        <Box marginLeft="0.5rem">
          <Text color="red.100">{msg.user}</Text>
          <Text as="span">{msg.body}</Text>
        </Box>
        {showModal && (
          <Box position="absolute" top="-2rem">
            User modal
          </Box>
        )}
      </ListItem>
    </>
  )
}
