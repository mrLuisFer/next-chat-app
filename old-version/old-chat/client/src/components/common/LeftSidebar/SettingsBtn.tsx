import { useState } from "react"
import { Box } from "@chakra-ui/react"
import { IoMdSettings } from "react-icons/io"

export default function SettingsBtn() {
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)

  return (
    <Box position="relative">
      <Box
        cursor="pointer"
        title="Settings"
        onClick={() => setShowSettingsModal((prevState) => !prevState)}
        userSelect="none"
      >
        <IoMdSettings size="2rem" />
      </Box>
      {showSettingsModal && (
        <Box position="absolute">
          <p>Settings modal</p>
        </Box>
      )}
    </Box>
  )
}
