import { Box } from "@chakra-ui/react"
import { useEffect, useState, useCallback } from "react"
import SearchBar from "components/gifs/SearchBar"
import GifsContent from "components/gifs/GifsContent"
import Layout from "components/common/Layout"
import { useGetGifValue } from "context/GifValueContext"

/*const apiKey = process.env.GIPHY_KEY*/
export default function Gifs() {
  const { gifValue, setGifValue } = useGetGifValue()
  const [gifsData, setGifsData] = useState([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const giphyUrl: string = `https://api.giphy.com/v1/gifs/search?api_key=p581czEQruojaMLjQ2dODC8vZ3UsSZRL&q=${gifValue}&limit=25&offset=0&rating=g&lang=en`

    fetch(giphyUrl)
      .then((res) => res.json())
      .then((data) => {
        setGifsData(data.data)
        setLoading(false)
      })
  }, [gifValue])

  // TODO: Add infinite scroll
  return (
    <Layout>
      <>
        <SearchBar setGifsQuery={setGifValue} gifsQuery={gifValue} />
        {gifValue.length >= 3 ? <GifsContent gifsData={gifsData} loading={loading} /> : <Box>Search some gif</Box>}
      </>
    </Layout>
  )
}
