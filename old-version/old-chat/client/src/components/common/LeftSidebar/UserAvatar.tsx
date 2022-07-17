import { Heading, Image as ChakraImg } from "@chakra-ui/react"
import Link from "next/link"
import BtnContainer from "./BtnContainer"
import { useUserContext } from "context/UserContext"

export default function UserAvatar() {
  const { user } = useUserContext()

  return (
    <Link href={`/user/${user.id}`} passHref>
      <a>
        <BtnContainer>
          <ChakraImg src={""} w="60px" h="60px" borderRadius="50%" />
          <Heading as="h1" fontSize="md" textTransform="capitalize" isTruncated>
            {user.username}
          </Heading>
        </BtnContainer>
      </a>
    </Link>
  )
}
