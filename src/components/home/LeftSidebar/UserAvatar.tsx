import { useUserContext } from "context/UserContext";
import { Box, Heading, Image as ChakraImg } from "@chakra-ui/react";
import Link from "next/link";
import BtnContainer from "./BtnContainer";

export default function UserAvatar() {
  const { username } = useUserContext();

  return (
    <Link href={`/user/${1}`} passHref>
      <a>
        <BtnContainer>
          <ChakraImg
            src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            w="60px"
            h="60px"
            borderRadius="50%"
          />
          <Heading as="h1" fontSize="md" textTransform="capitalize" isTruncated>
            {username}
          </Heading>
        </BtnContainer>
      </a>
    </Link>
  );
}
