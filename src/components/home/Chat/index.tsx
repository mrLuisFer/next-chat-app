import ChatInputs from "./ChatInputs";
import { Box } from "@chakra-ui/react";
import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";

export default function Chat() {
  return (
    <Box display="flex" flexFlow="column">
      <ChatHeader />
      <ChatContent />
      <ChatInputs />
    </Box>
  );
}
