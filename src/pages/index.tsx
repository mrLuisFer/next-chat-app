import { useEffect } from 'react'
import type { NextPage } from "next";
import { useAuthState } from 'react-firebase-hooks/auth'
import { Spinner } from '@chakra-ui/react'
import { firebase } from 'lib/Firebase'
import { useUserContext } from 'context/UserContext'
import Chat from "components/home/Chat";
import { useRouter } from 'next/router'

const Home: NextPage = () => {

  const router = useRouter()
  // Move into User Context file
  const auth: any = firebase.auth()
  const [user, loading, error] = useAuthState(auth)
  const { setUsername, setAvatar, setUserId } = useUserContext()

  console.log(loading, user, error)

  useEffect(() => {
    if (user) {
      const username: string = user?.displayName as string
      const avatar: string = user?.photoURL as string
      const id: string = user?.uid as string
      setUsername(username)
      setAvatar(avatar)
      setUserId(id)
    } else {
      router.push('/login')
    }
  }, [user])

  return (
    <>
      {loading ? <Spinner size="xl" speed="0.65s" thickness='3px' /> : <Chat />}
    </>
  )
};

export default Home;
