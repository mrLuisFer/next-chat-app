import type { NextPage } from "next";
import { Spinner } from '@chakra-ui/react'
import { useUserContext } from 'context/UserContext'
import Chat from "components/home/Chat"
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  const { userLoading } = useUserContext()

  return (
    <>
      {userLoading ? <Spinner size="xl" speed="0.65s" thickness='3px' /> : <Chat />}
    </>
  )
};

export default Home;
