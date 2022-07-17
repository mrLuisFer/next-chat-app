import { useState, Dispatch, SetStateAction, useRef, FormEvent } from "react"
import { Box, FormControl, Input } from "@chakra-ui/react"
import { useGetGifValue } from "context/GifValueContext"
import { useChat } from "hooks/useChat"
import { AiOutlineSend, AiOutlineGif } from "react-icons/ai"
import { Button } from "@chakra-ui/react"

interface ChatInputsProps {
  messageText: string
  setMessageText: Dispatch<SetStateAction<string>>
  query: any
}

export default function ChatInputs({ messageText, setMessageText, query }: ChatInputsProps) {
  const { gifValue } = useGetGifValue()
  const [showGifsPanel, setShowGifsPanel] = useState(false)
  const inputBoxRef = useRef<any>()
  const { sendMessage } = useChat(query)

  const sendChatMessage = (messageText: string) => {
    if (messageText.length > 1) {
      sendMessage(messageText)
      setMessageText("")
      inputBoxRef?.current?.focus()
    }
  }

  const handleFormSubmission = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    sendChatMessage(messageText)
  }

  return (
    <Box position="fixed" bottom="2rem" w="100%" h="min-content">
      <FormControl
        display="flex"
        gap="1rem"
        alignItems="center"
        as="form"
        position="relative"
        onSubmit={(e) => handleFormSubmission(e)}
      >
        <Input
          w="400px"
          variant="filled"
          ref={inputBoxRef}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
        />
        <Button type="button" onClick={() => setShowGifsPanel((prevState) => !prevState)}>
          <AiOutlineGif size="1.5rem" />
        </Button>
        <Button type="submit">
          <AiOutlineSend size="1.2rem" />
        </Button>
      </FormControl>
      {showGifsPanel && (
        <>
          {gifValue.length > 0 ? (
            <Box position="absolute" top="0">
              {gifValue}
            </Box>
          ) : (
            <Box position="absolute" top="0">
              Gifs
            </Box>
          )}
        </>
      )}
    </Box>
  )
}
