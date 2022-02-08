import { Box, Heading } from "@chakra-ui/react";
import { useUserContext } from "context/UserContext";

export default function LeftSidebar() {
  const { username } = useUserContext();

  return (
    <Box
      bg="gray.800"
      h="100vh"
      boxShadow="1px 0 5px rgba(0, 0, 0, 0.3)"
      p="1rem"
      borderRadius="0 10px 10px 0"
    >
      <Box>
        <Heading as="h1" fontSize="md">
          {username}
        </Heading>
      </Box>
    </Box>
  );
}
