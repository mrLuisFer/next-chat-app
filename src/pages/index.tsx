import type { NextPage } from "next";
import Chat from "components/home/Chat";
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebase } from 'lib/Firebase'

const Home: NextPage = () => {
  const auth: any = firebase.auth()
  const [user, loading, error] = useAuthState(auth)

  console.log(loading, user, error)
  return (
    <Chat />
  )
};

export default Home;
