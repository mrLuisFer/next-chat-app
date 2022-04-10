import { useState, Dispatch, SetStateAction } from "react"
import { Box, FormControl } from "@chakra-ui/react"
import ChatActions from "./ChatActions"
import { useGetGifValue } from "context/GifValueContext"

interface ChatInputsProps {
  inputBox: any
  messageText: string
  channel: any
  setMessageText: Dispatch<SetStateAction<string>>
}

export default function ChatInputs({ inputBox, messageText, channel, setMessageText }: ChatInputsProps) {
  const { gifValue } = useGetGifValue()
  const [showGifsPanel, setShowGifsPanel] = useState(false)
  const [connected, setConnected] = useState(false)

  const messageTextIsEmpty = messageText.trim().length === 0

  const sendChatMessage = (messageText: string) => {
    channel.publish({ name: "chat-message", data: messageText })
    setMessageText("")
    inputBox.focus()
  }

  const handleFormSubmission = (event: any) => {
    event.preventDefault()
    sendChatMessage(messageText)
  }

  const handleKeyPress = (event: any) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return
    }
    sendChatMessage(messageText)
    event.preventDefault()
  }

  return (
    <Box position="fixed" bottom="2rem" w="100%" h="min-content">
      <Box as="form" position="relative" onSubmit={handleFormSubmission}>
        <FormControl display="flex" gap="1rem" alignItems="center">
          <textarea
            ref={(element) => {
              inputBox = element
            }}
            value={messageText}
            placeholder="Type a message..."
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
          ></textarea>
          <ChatActions connected={connected} setShowGifsPanel={setShowGifsPanel} />
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
    </Box>
  )
}
