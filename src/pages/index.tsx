import { useState, useEffect } from 'react'
import type { NextPage } from "next";
import { useRouter } from 'next/router'
import Chat from "components/home/Chat";
import { useUserContext } from 'context/UserContext'

const Home: NextPage = () => {
  const [authorized, setAuthorized] = useState<boolean>(false)
  const { username } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    console.log(`${username.length} ${authorized}`)
    if (username.length > 2) {
      setAuthorized(true)
    } else {
      router.push('/login')
    }
  }, [])

  return (
    <>{authorized && <Chat />}</>
  )
};

export default Home;
