import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { IMsg } from "types/IMsg"
import { useUserContext } from "context/UserContext"
import { Box, FormControl, Input, Button } from "@chakra-ui/react"
import { AiOutlineSend, AiOutlineGif } from "react-icons/ai"
import { useGetGifValue } from "context/GifValueContext"

export default function ChatInputs() {
  const [msg, setMsg] = useState<string>("")
  const [showGifsPanel, setShowGifsPanel] = useState<boolean>(false)
  const { connected, username } = useUserContext()
  const { gifValue } = useGetGifValue()
  const inputRef: any = useRef(null)

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (msg) {
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

  return (
    <Box position="fixed" bottom="2rem" w="100%" h="min-content">
      <Box as="form" position="relative" onSubmit={(e: any) => handleSendMessage(e)}>
        <FormControl display="flex" gap="1rem" alignItems="center">
          <Input
            disabled={!connected}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMsg(e.target.value)}
            placeholder={connected ? "Type a message..." : "Connecting..."}
            ref={inputRef}
            type="text"
            value={msg}
            w="450px"
          />
          <Button type="button" onClick={() => setShowGifsPanel(true)}>
            <AiOutlineGif size="1.5rem" />
          </Button>
          <Button type="submit" disabled={!connected}>
            <AiOutlineSend size="1.2rem" />
          </Button>
        </FormControl>
        {showGifsPanel && (
          <Box position="absolute" top="0">
            {gifValue}
          </Box>
        )}
      </Box>
    </Box>
  )
}
