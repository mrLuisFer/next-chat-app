import { useState } from "react"
import { Box, Img, Text, ListItem } from "@chakra-ui/react"
import Link from "next/link"
import type { IMsg } from "types"
import { useUserContext } from "context/UserContext"
import "./UserMessage.module.css"

interface UserMessageProps {
  msg: IMsg
}

export default function UserMessage({ msg }: UserMessageProps) {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { connected, avatar, userId } = useUserContext()

  const handleShowUserModal = () => {
    setShowModal(true)
  }

  const handleHideModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <ListItem display="flex" alignItems="center">
        <Box position="relative" onMouseEnter={() => handleShowUserModal()} onMouseLeave={() => handleHideModal()}>
          <Link href={`/user/${userId}`}>
            <a>
              <Img src={avatar} alt={msg.user} borderRadius="50%" w="45px" h="45px" />
              <div className={connected ? "connected" : ""} />
            </a>
          </Link>
        </Box>
        <Box marginLeft="0.5rem">
          <Text color="red.100">{msg.user}</Text>
          <Text as="span">{msg.msg}</Text>
        </Box>
      </ListItem>
      {showModal && <Box>User modal</Box>}
    </>
  )
}
