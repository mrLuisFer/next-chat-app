import type { NextPage } from "next"
import { useAuth } from "hooks/useAuth"
import GifsUi from "./GifsUi"

const Gifs: NextPage = () => {
  const { authorized } = useAuth()

  return <>{authorized && <GifsUi />}</>
}

export default Gifs
