import { Box } from "@chakra-ui/react"
import ChatContent from "./ChatContent"
import ChatInputs from "./ChatInput"
import ChatHeader from "./ChatHeader"
import dynamic from "next/dynamic"

const AblyChatComponent = dynamic(() => import("./AblyChatComponent"), { ssr: false })

export default function Chat() {
  return (
    <Box display="flex" flexFlow="column" p="0 2rem 0 0.5rem">
      <ChatHeader />
      {/* <ChatContent />
      <ChatInputs /> */}
      <AblyChatComponent />
    </Box>
  )
}
