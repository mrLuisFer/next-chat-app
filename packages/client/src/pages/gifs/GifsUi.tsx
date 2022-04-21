import { Box } from "@chakra-ui/react"
import { useEffect, useState, useCallback } from "react"
import SearchBar from "components/gifs/SearchBar"
import GifsContent from "components/gifs/GifsContent"
import Layout from "components/common/Layout"
import {useGetGifValue} from "context/GifValueContext"

/*const apiKey = process.env.GIPHY_KEY*/
export default function GifsUi() {
  const {gifValue, setGifValue} = useGetGifValue()
  const [gifsData, setGifsData] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  const getGifs = useCallback(async (giphyUrl: string) => {
    setLoading(true)
    const response: Response = await fetch(giphyUrl)
    const data = await response.json()
    if (data.data.length > 0) setGifsData(data.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    const giphyUrl: string = `https://api.giphy.com/v1/gifs/search?api_key=p581czEQruojaMLjQ2dODC8vZ3UsSZRL&q=${gifValue}&limit=25&offset=0&rating=g&lang=en`
    getGifs(giphyUrl)
  }, [gifValue])

  return (
    <Layout>
      <>
        <SearchBar setGifsQuery={setGifValue} gifsQuery={gifValue} />
        {gifValue.length >= 3 ? <GifsContent gifsData={gifsData} loading={loading} /> : <Box>Search some gif</Box>}
      </>
    </Layout>
  )
}
