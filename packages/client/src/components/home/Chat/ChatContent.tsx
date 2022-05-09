import { nanoid } from "nanoid"
import { Box, UnorderedList } from "@chakra-ui/react"
import { useChat } from "hooks/useChat"
import UserMessage from "./UserMessage"

export default function ChatContent({ query }: any) {
  const { messages } = useChat(query)
  console.log(messages)

  return (
    <Box overflowY="auto" h="460px" className="chatContent">
      <UnorderedList styleType="none" display="flex" flexDirection="column" gap="1rem 0" margin="0">
        {messages.length > 1 ? (
          messages.map((msg) => <UserMessage key={nanoid()} msg={msg} />)
        ) : (
          <div>No chat messages</div>
        )}
      </UnorderedList>
    </Box>
  )
}
