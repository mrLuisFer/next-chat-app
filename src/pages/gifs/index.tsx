import { useEffect, useState } from 'react'
import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { useAuth } from "hooks/useAuth"
import GifsUi from './GifsUi'

const giphyApiKey: string = 'https://api.giphy.com/v1/gifs/search?api_key=p581czEQruojaMLjQ2dODC8vZ3UsSZRL&q=hacker&limit=25&offset=0&rating=g&lang=en'

const Gifs: NextPage = () => {
  const { authorized } = useAuth()
  const [gifsData, setGifsData] = useState<any[]>([])

  const getGifs = async () => {
    const response: Response = await fetch(giphyApiKey)
    const data = await response.json()
    if (data.length > 0) setGifsData(data)
    console.log(data)
  }

  useEffect(() => {
    console.log(authorized)
    getGifs()
  }, [])

  return (
    <>
      {authorized && <GifsUi />}
    </>
  )
};

export default Gifs;
