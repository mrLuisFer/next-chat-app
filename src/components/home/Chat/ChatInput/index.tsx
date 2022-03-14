import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { IMsg } from "types/IMsg"
import { useUserContext } from "context/UserContext"
import { Box, FormControl, Input, Textarea } from "@chakra-ui/react"
import { useGetGifValue } from "context/GifValueContext"
import ChatActions from "./ChatActions"

export default function ChatInputs() {
  const [msg, setMsg] = useState<string>("")
  const [showGifsPanel, setShowGifsPanel] = useState<boolean>(false)
  const { connected, username } = useUserContext()
  const { gifValue } = useGetGifValue()
  const inputRef: any = useRef(null)

  const handleChangeMsg = (e: any) => {
    const value: string = e.target.value
    setMsg(value)
  }

  const sendMsg = async () => {
    if (msg && msg.length > 1) {
      const message: IMsg = {
        user: username,
        msg,
      }
      const resp: Response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })
      if (resp.ok) setMsg("")
      console.log(msg)
    }
    inputRef?.current?.focus()
  }

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMsg()
  }

  const handleEnterKeyDown = (e: any) => {
    console.log(e.keyCode)
    if (e.keyCode === 13 && e.code === "Enter") {
      sendMsg()
    }
  }

  return (
    <Box position="fixed" bottom="2rem" w="100%" h="min-content">
      <Box as="form" position="relative" onSubmit={(e: any) => handleSendMessage(e)}>
        <FormControl display="flex" gap="1rem" alignItems="center">
          <Textarea
            disabled={!connected}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChangeMsg(e)}
            placeholder={connected ? "Type a message..." : "Connecting..."}
            ref={inputRef}
            value={msg}
            w="450px"
            resize="none"
            isFullWidth
            onKeyDown={(e) => handleEnterKeyDown(e)}
          />
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
