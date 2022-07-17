import { Box } from "@chakra-ui/react"
import { AiOutlineFileGif } from "react-icons/ai"
import { BsChatDots } from "react-icons/bs"
import UserAvatar from "./UserAvatar"
import SimpleSidebarBtn from "./SimpleSidebarBtn"
import SettingsBtn from "./SettingsBtn"
import { MdDraw } from "react-icons/md"

export default function LeftSidebar() {
  return (
    <Box position="relative">
      <Box
        bg="gray.800"
        h="100vh"
        boxShadow="1px 0 5px rgba(0, 0, 0, 0.3)"
        p="1rem"
        borderRadius="0 10px 10px 0"
        position="fixed"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column" gap="1rem">
          <UserAvatar />
          <SimpleSidebarBtn to="/chat" text="Chat" Icon={BsChatDots} />
          <SimpleSidebarBtn to="/gifs" text="Gifs" Icon={AiOutlineFileGif} />
          <SimpleSidebarBtn to="/draw" text="Draw" Icon={MdDraw} />
        </Box>
        <Box>
          <SettingsBtn />
        </Box>
      </Box>
    </Box>
  )
}
