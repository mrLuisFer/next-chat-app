import { Button } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { AiOutlineSend, AiOutlineGif } from "react-icons/ai"

interface ChatActionsProps {
  connected: boolean
  setShowGifsPanel: Dispatch<SetStateAction<boolean>>
}

export default function ChatActions({ setShowGifsPanel, connected }: ChatActionsProps) {
  return (
    <>
      <Button type="submit" onClick={() => setShowGifsPanel((prevState) => !prevState)}>
        <AiOutlineGif size="1.5rem" />
      </Button>
      <Button type="submit" disabled={!connected}>
        <AiOutlineSend size="1.2rem" />
      </Button>
    </>
  )
}
