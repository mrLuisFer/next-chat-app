import { Box, Heading, Image as ChakraImg } from "@chakra-ui/react"
import Link from "next/link"
import BtnContainer from "./BtnContainer"
import { useUserContext } from "context/UserContext"

export default function UserAvatar() {
  const { username, avatar, userId } = useUserContext()

  return (
    <Link href={`/user/${userId}`} passHref>
      <a>
        <BtnContainer>
          <ChakraImg src={avatar} w="60px" h="60px" borderRadius="50%" />
          <Heading as="h1" fontSize="md" textTransform="capitalize" isTruncated>
            {username}
          </Heading>
        </BtnContainer>
      </a>
    </Link>
  )
}
