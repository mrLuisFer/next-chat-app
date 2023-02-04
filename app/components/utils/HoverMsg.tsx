import { Box, Fade } from "@chakra-ui/react";
import { useState } from "react";

interface HoverMsgProps {
  msg: string;
  children: any;
  w?: string;
  h?: string;
  top: string;
  left: string;
}

export default function HoverMsg({ msg, w, h, top, left, children }: HoverMsgProps): JSX.Element {
  const [showMsg, setShowMsg] = useState<boolean>(false);

  return (
    <Box
      position="relative"
      display="inline-block"
      w="fit-content"
      onMouseEnter={() => {
        setShowMsg(true);
      }}
      onMouseLeave={() => {
        setShowMsg(false);
      }}
    >
      {children}
      {showMsg && (
        <Fade in={showMsg}>
          <Box
            position="absolute"
            w={w ?? "fit-content"}
            h={h ?? "fit-content"}
            top={top ?? "0"}
            left={left ?? "0"}
            bg="black"
            color="white"
            p="0.5rem 1rem"
            borderRadius="5px"
          >
            {msg}
          </Box>
        </Fade>
      )}
    </Box>
  );
}
