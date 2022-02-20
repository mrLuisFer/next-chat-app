import type { NextPage } from "next";
import Chat from "components/home/Chat";
import { useAuth } from "hooks/useAuth"

const Home: NextPage = () => {
  const { authorized } = useAuth()

  return (
    <>{authorized && <Chat />}</>
  )
};

export default Home;
