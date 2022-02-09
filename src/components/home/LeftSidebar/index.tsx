import { Box } from "@chakra-ui/react";
import UserAvatar from "./UserAvatar";
import GifsBtn from "./GifsBtn";

export default function LeftSidebar() {
  return (
    <Box
      bg="gray.800"
      h="100vh"
      boxShadow="1px 0 5px rgba(0, 0, 0, 0.3)"
      p="1rem"
      borderRadius="0 10px 10px 0"
    >
      <Box display="flex" flexDirection="column" gap="1rem">
        <UserAvatar />
        <GifsBtn />
      </Box>
      <Box></Box>
    </Box>
  );
}
