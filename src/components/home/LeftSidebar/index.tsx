import { Box, Heading } from "@chakra-ui/react";
import { useUserContext } from "context/UserContext";

export default function LeftSidebar() {
  const { username } = useUserContext();

  return (
    <Box bg="gray.800" h="100vh" boxShadow="xl" p="1rem">
      <Box>
        <Heading as="h1" fontSize="md">
          {username}
        </Heading>
      </Box>
    </Box>
  );
}
